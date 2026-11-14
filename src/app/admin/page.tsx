"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { contact } from "@/content/site";
import {
  contactToForm,
  formToContact,
  parseContactInfo,
  validateContact,
  type ContactErrors,
  type ContactForm,
  type ContactKey,
} from "@/lib/content";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

type Phase = "loading" | "ready" | "denied" | "expired";
type Notice = { kind: "ok" | "error"; text: string } | null;

const FIELDS: { key: ContactKey; label: string; help?: string; multiline?: boolean; type?: string }[] = [
  { key: "whatsapp", label: "WhatsApp", help: "Só números: 55 + DDD + número. Ex.: 5511987654321", type: "tel" },
  { key: "whatsappMessage", label: "Mensagem pronta do WhatsApp", help: "Texto que aparece digitado quando o paciente abre a conversa.", multiline: true },
  { key: "phone", label: "Telefone para ligações", help: "Só números: 55 + DDD + número. Deixe vazio se não houver.", type: "tel" },
  { key: "phoneDisplay", label: "Telefone como aparece escrito", help: "Ex.: (18) 3333-4444. Vazio = formato automático." },
  { key: "email", label: "E-mail", type: "email" },
  { key: "instagram", label: "Instagram", help: "Endereço completo do perfil. Ex.: https://www.instagram.com/usuario/", type: "url" },
  { key: "address", label: "Endereço do consultório", multiline: true },
  { key: "hours", label: "Horário de atendimento", help: "Ex.: Segunda a sexta, das 8h às 18h. Vazio = não aparece no site.", multiline: true },
];

const input =
  "mt-2 block w-full rounded-md border bg-surface px-4 py-3 text-ink focus:border-primary";

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" });
}

export default function AdminPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("loading");
  const [userEmail, setUserEmail] = useState("");
  const [form, setForm] = useState<ContactForm>(() => contactToForm(contact));
  const [errors, setErrors] = useState<ContactErrors>({});
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const leaving = useRef(false);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    let active = true;

    (async () => {
      const { data: { session } } = await sb.auth.getSession();
      if (!active) return;
      if (!session) {
        router.replace("/admin/login/");
        return;
      }
      setUserEmail(session.user.email ?? "");

      const { data: isAdmin, error: rpcError } = await sb.rpc("is_admin");
      if (!active) return;
      if (rpcError || isAdmin !== true) {
        setPhase("denied");
        return;
      }

      const { data, error } = await sb
        .from("site_content")
        .select("value, updated_at")
        .eq("key", "contact_info")
        .maybeSingle();
      if (!active) return;
      if (error) setNotice({ kind: "error", text: "Não foi possível carregar os dados atuais. Recarregue a página." });
      const current = data ? parseContactInfo(data.value) : null;
      if (current) setForm(contactToForm(current));
      setUpdatedAt(data?.updated_at ?? null);
      setPhase("ready");
    })();

    const { data: sub } = sb.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT" && !leaving.current) setPhase("expired");
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  function update(key: ContactKey, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setNotice(null);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sb = getSupabase();
    if (!sb) return;

    const value = formToContact(form);
    const found = validateContact(value);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setNotice({ kind: "error", text: "Corrija os campos destacados antes de salvar." });
      return;
    }

    setSaving(true);
    setNotice(null);
    const { data: { user } } = await sb.auth.getUser();
    if (!user) {
      setSaving(false);
      setPhase("expired");
      return;
    }

    const { data, error } = await sb
      .from("site_content")
      .upsert({ key: "contact_info", value }, { onConflict: "key" })
      .select("updated_at")
      .single();
    setSaving(false);

    if (error) {
      if (error.code === "42501") setNotice({ kind: "error", text: "Sua conta não tem permissão para alterar o conteúdo." });
      else if (error.code === "23514") setNotice({ kind: "error", text: "O servidor recusou o formato dos dados. Confira os campos." });
      else setNotice({ kind: "error", text: "Não foi possível salvar. Verifique a conexão e tente novamente." });
      return;
    }
    setUpdatedAt(data.updated_at);
    setForm(contactToForm(value));
    setNotice({ kind: "ok", text: "Alterações salvas. O site público mostra os novos dados a partir da próxima publicação." });
  }

  async function signOut() {
    const sb = getSupabase();
    leaving.current = true;
    await sb?.auth.signOut();
    router.replace("/admin/login/");
  }

  if (!isSupabaseConfigured) {
    return (
      <>
        <h1 className="text-3xl md:text-4xl">Área administrativa</h1>
        <p className="mt-6">O painel não está configurado neste ambiente.</p>
      </>
    );
  }

  if (phase === "loading") {
    return (
      <>
        <h1 className="text-3xl md:text-4xl">Área administrativa</h1>
        <p role="status" className="mt-6">Carregando…</p>
      </>
    );
  }

  if (phase === "expired") {
    return (
      <>
        <h1 className="text-3xl md:text-4xl">Área administrativa</h1>
        <p className="mt-6">Sua sessão expirou. Entre novamente para continuar.</p>
        <Link href="/admin/login/" className="mt-6 inline-flex min-h-12 items-center rounded-md bg-primary px-6 py-3 font-medium text-surface hover:bg-primary-dark">
          Entrar
        </Link>
      </>
    );
  }

  const signOutButton = (
    <button type="button" onClick={signOut}
      className="inline-flex min-h-11 items-center rounded-md border border-primary px-5 py-2 font-medium text-primary hover:bg-sage">
      Sair
    </button>
  );

  if (phase === "denied") {
    return (
      <>
        <h1 className="text-3xl md:text-4xl">Área administrativa</h1>
        <p className="mt-6">Sua conta ({userEmail}) não tem permissão para editar o site.</p>
        <div className="mt-6">{signOutButton}</div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl">Contatos do consultório</h1>
          <p className="mt-2 text-sm">
            Conectado como {userEmail}
            {updatedAt ? ` · Última alteração: ${formatDate(updatedAt)}` : ""}
          </p>
        </div>
        {signOutButton}
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-10 space-y-7">
        {FIELDS.map((f) => {
          const err = errors[f.key];
          const describedBy = [f.help ? `${f.key}-ajuda` : "", err ? `${f.key}-erro` : ""].filter(Boolean).join(" ") || undefined;
          const common = {
            id: f.key,
            value: form[f.key],
            "aria-invalid": err ? true : undefined,
            "aria-describedby": describedBy,
            className: `${input} ${err ? "border-red-700" : "border-bronze"}`,
          };
          return (
            <div key={f.key}>
              <label htmlFor={f.key} className="font-medium">{f.label}</label>
              {f.multiline ? (
                <textarea {...common} rows={f.key === "whatsappMessage" ? 3 : 2}
                  onChange={(e) => update(f.key, e.target.value)} />
              ) : (
                <input {...common} type={f.type ?? "text"}
                  onChange={(e) => update(f.key, e.target.value)} />
              )}
              {f.help ? <p id={`${f.key}-ajuda`} className="mt-1 text-sm">{f.help}</p> : null}
              {err ? <p id={`${f.key}-erro`} className="mt-1 text-sm font-medium text-red-800">{err}</p> : null}
            </div>
          );
        })}

        {notice ? (
          <p role={notice.kind === "error" ? "alert" : "status"}
            className={`rounded-md border px-4 py-3 ${notice.kind === "ok"
              ? "border-primary bg-sage text-primary-dark"
              : "border-red-700 bg-red-50 text-red-800"}`}>
            {notice.text}
          </p>
        ) : null}

        <button type="submit" disabled={saving}
          className="inline-flex min-h-12 items-center rounded-md bg-primary px-6 py-3 font-medium text-surface hover:bg-primary-dark disabled:opacity-60">
          {saving ? "Salvando…" : "Salvar alterações"}
        </button>
      </form>
    </>
  );
}
