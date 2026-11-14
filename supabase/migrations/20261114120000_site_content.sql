-- Conteúdo institucional editável e controle de administradores.
-- Segurança: RLS + privilégios explícitos (não depender dos padrões do Supabase).

-- 1) Administradores: só o dono do projeto (painel/SQL) altera esta tabela.
create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
-- sem políticas: anon e authenticated não leem nem escrevem
revoke all on table public.admin_users from anon, authenticated;

-- 2) "O usuário logado é administrador?"
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  );
$$;
revoke all on function public.is_admin() from public, anon, authenticated;
grant execute on function public.is_admin() to authenticated;

-- 3) Validação do formato de cada bloco (chave desconhecida = inválida)
create or replace function public.site_content_is_valid(k text, v jsonb)
returns boolean
language plpgsql
immutable
set search_path = ''
as $$
declare
  allowed text[];
  f text;
begin
  if v is null or jsonb_typeof(v) <> 'object' then
    return false;
  end if;

  case k
    when 'contact_info' then
      allowed := array['whatsapp', 'whatsappMessage', 'phone', 'phoneDisplay',
                       'email', 'instagram', 'address', 'hours'];
      for f in select jsonb_object_keys(v) loop
        if not (f = any (allowed)) then return false; end if;      -- campo desconhecido
      end loop;
      foreach f in array allowed loop
        if not (v ? f) then return false; end if;                  -- campo ausente
        if jsonb_typeof(v -> f) not in ('string', 'null') then return false; end if;
      end loop;
      if v ->> 'whatsapp' is not null and v ->> 'whatsapp' !~ '^55[0-9]{10,11}$' then return false; end if;
      if v ->> 'phone' is not null and v ->> 'phone' !~ '^55[0-9]{10,11}$' then return false; end if;
      if v ->> 'email' is not null and v ->> 'email' !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then return false; end if;
      if v ->> 'instagram' is not null
         and v ->> 'instagram' !~ '^https://(www\.)?instagram\.com/[A-Za-z0-9._]+/?$' then return false; end if;
      if char_length(coalesce(v ->> 'whatsappMessage', '')) not between 1 and 300 then return false; end if;
      if char_length(coalesce(v ->> 'phoneDisplay', '')) > 40
         or char_length(coalesce(v ->> 'email', '')) > 120
         or char_length(coalesce(v ->> 'address', '')) > 200
         or char_length(coalesce(v ->> 'hours', '')) > 200 then return false; end if;
      return true;
    else
      return false;
  end case;
end;
$$;

-- 4) Conteúdo
create table public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null,
  constraint site_content_valido check (public.site_content_is_valid(key, value))
);

-- data e autor de cada alteração, sempre preenchidos pelo banco
create or replace function public.site_content_stamp()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

create trigger site_content_stamp
  before insert or update on public.site_content
  for each row execute function public.site_content_stamp();

alter table public.site_content enable row level security;

revoke all on table public.site_content from anon, authenticated;
grant select on table public.site_content to anon, authenticated;
grant insert, update on table public.site_content to authenticated;  -- sem delete

create policy "conteudo: leitura publica"
  on public.site_content for select
  to anon, authenticated
  using (true);

create policy "conteudo: administrador insere"
  on public.site_content for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "conteudo: administrador altera"
  on public.site_content for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
