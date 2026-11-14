-- Dados apenas do ambiente LOCAL (aplicados em "supabase db reset").
insert into public.site_content (key, value) values (
  'contact_info',
  jsonb_build_object(
    'whatsapp', '5518991061661',
    'whatsappMessage', 'Olá, Dr. Marco Aurélio! Vim pelo site e gostaria de agendar uma consulta. Poderia me informar os horários disponíveis?',
    'phone', null,
    'phoneDisplay', null,
    'email', null,
    'instagram', null,
    'address', 'Rua Domingos de Morais, 2781 - São Paulo, SP - 04035-001',
    'hours', null
  )
)
on conflict (key) do nothing;
