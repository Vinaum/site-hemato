-- Dispara a publicação do site no GitHub quando o conteúdo muda.
-- A chave do GitHub fica no Vault (nome: github_dispatch_token). Sem ela, nada acontece.

create extension if not exists pg_net with schema extensions;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function private.dispatch_github_publish()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  token text;
begin
  select decrypted_secret into token
  from vault.decrypted_secrets
  where name = 'github_dispatch_token'
  limit 1;

  if token is null or token = '' then
    return null;  -- ambiente local ou chave não configurada
  end if;

  -- assíncrono: não atrasa o salvamento do painel
  perform net.http_post(
    url := 'https://api.github.com/repos/Vinaum/site-hemato/actions/workflows/deploy.yml/dispatches',
    body := jsonb_build_object('ref', 'main', 'inputs', jsonb_build_object('content_only', 'true')),
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || token,
      'Accept', 'application/vnd.github+json',
      'X-GitHub-Api-Version', '2022-11-28',
      'Content-Type', 'application/json',
      'User-Agent', 'supabase-site-hemato'
    ),
    timeout_milliseconds := 5000
  );
  return null;
end;
$$;

revoke all on function private.dispatch_github_publish() from public, anon, authenticated;

create trigger site_content_publish
  after insert or update on public.site_content
  for each statement
  execute function private.dispatch_github_publish();
