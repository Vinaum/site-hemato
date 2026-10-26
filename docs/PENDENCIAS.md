# Pendências antes de publicar

Itens que dependem de dados reais ou de decisões do médico.

## Conteúdo (todos os `[PREENCHER: ...]`)
- [ ] Nome, CRM-UF e número, RQE (confirmar se há RQE de Hematologia)
- [ ] Textos: início, sobre, áreas de atuação, consultas
- [ ] Telefone, WhatsApp (somente dígitos com 55 + DDD), e-mail, endereço, horários
- [ ] Foto profissional e versões otimizadas em `public/images/`
- [ ] Política de privacidade (redigir na Fase 6, com revisão da LGPD)

## Técnico
- [ ] Dados estruturados (JSON-LD) com os dados reais
- [ ] Imagem de compartilhamento (Open Graph) e favicon final
- [ ] Liberar indexação: `NEXT_PUBLIC_ALLOW_INDEXING=true` somente na publicação final
- [ ] Conferir o texto oficial da Resolução CFM 2.336/2023 (identificação, restrições)

## Trava de publicação
`npm run check:placeholders` deve passar (nenhum `[PREENCHER` em `out/`).
