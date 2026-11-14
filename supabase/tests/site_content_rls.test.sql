begin;
create extension if not exists pgtap with schema extensions;
select plan(22);

-- Usuários de teste
insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'admin@teste.local'),
  ('22222222-2222-2222-2222-222222222222', 'comum@teste.local');
insert into public.admin_users (user_id) values ('11111111-1111-1111-1111-111111111111');

-- Conteúdo de partida (como dono do banco)
insert into public.site_content (key, value) values ('contact_info', jsonb_build_object(
  'whatsapp', '5518991061661', 'whatsappMessage', 'Olá!', 'phone', null, 'phoneDisplay', null,
  'email', null, 'instagram', null, 'address', 'Endereço original', 'hours', null))
on conflict (key) do update set value = excluded.value;

-- ===== Visitante (anon) =====
set local role anon;
select ok((select count(*) from public.site_content) >= 1, 'visitante lê o conteúdo');
select throws_ok($$insert into public.site_content (key, value) values ('contact_info', '{}')$$,
  '42501', null, 'visitante não insere');
select throws_ok($$update public.site_content set value = value$$,
  '42501', null, 'visitante não altera');
select throws_ok($$delete from public.site_content$$, '42501', null, 'visitante não apaga');
select throws_ok($$select * from public.admin_users$$, '42501', null, 'visitante não vê administradores');
select throws_ok($$select public.is_admin()$$, '42501', null, 'visitante não chama is_admin()');

-- ===== Usuário logado comum =====
reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub": "22222222-2222-2222-2222-222222222222", "role": "authenticated"}';
select is(public.is_admin(), false, 'usuário comum não é administrador');
select ok((select count(*) from public.site_content) >= 1, 'usuário comum lê o conteúdo');
select lives_ok($$update public.site_content set value = jsonb_set(value, '{address}', '"invadido"') where key = 'contact_info'$$,
  'update de usuário comum não dá erro...');
select is((select value ->> 'address' from public.site_content where key = 'contact_info'), 'Endereço original',
  '...mas não altera nada');
select throws_ok($$insert into public.site_content (key, value) values ('contact_info', '{}') on conflict (key) do nothing$$,
  '42501', null, 'usuário comum não insere');
select throws_ok($$delete from public.site_content$$, '42501', null, 'usuário comum não apaga');
select throws_ok($$insert into public.admin_users (user_id) values ('22222222-2222-2222-2222-222222222222')$$,
  '42501', null, 'usuário comum não se torna administrador');
select throws_ok($$select * from public.admin_users$$, '42501', null, 'usuário comum não vê administradores');

-- ===== Administrador =====
reset role;
set local role authenticated;
set local request.jwt.claims to '{"sub": "11111111-1111-1111-1111-111111111111", "role": "authenticated"}';
select is(public.is_admin(), true, 'administrador é reconhecido');
select lives_ok($$update public.site_content set value = jsonb_set(value, '{hours}', '"Seg a sex, 8h às 18h"') where key = 'contact_info'$$,
  'administrador altera');
select is((select value ->> 'hours' from public.site_content where key = 'contact_info'), 'Seg a sex, 8h às 18h',
  'alteração gravada');
select is((select updated_by from public.site_content where key = 'contact_info'),
  '11111111-1111-1111-1111-111111111111'::uuid, 'autor da alteração registrado');
select throws_ok($$update public.site_content set value = jsonb_set(value, '{whatsapp}', '"123"') where key = 'contact_info'$$,
  '23514', null, 'validação: WhatsApp fora do formato é recusado');
select throws_ok($$update public.site_content set value = value || '{"extra": "x"}' where key = 'contact_info'$$,
  '23514', null, 'validação: campo desconhecido é recusado');
select throws_ok($$insert into public.site_content (key, value) values ('chave_inventada', '{}')$$,
  '23514', null, 'validação: bloco desconhecido é recusado');
select throws_ok($$delete from public.site_content$$, '42501', null, 'nem o administrador apaga pelo site');

select * from finish();
rollback;
