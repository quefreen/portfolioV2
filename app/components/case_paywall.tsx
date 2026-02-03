// src/components/CasePaywall.tsx
import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type CasePaywallProps = {
  children: React.ReactNode

  // para diferenciar cookies por case
  caseKey: string

  // quando senha errada, vindo de ?pw=1
  wrongPassword?: boolean

  // variável de ambiente que guarda a senha (server-only)
  passwordEnvKey: string

  // CTAs
  linkedinUrl: string
  contactEmail: string

  // opcional: link "ver próximo projeto"
  nextHref?: string
}

function cookieName(caseKey: string) {
  return `case_unlocked_${caseKey}`
}

export default async function CasePaywall({
  children,
  caseKey,
  wrongPassword = false,
  passwordEnvKey,
  linkedinUrl,
  contactEmail,
  nextHref = "/",
}: CasePaywallProps) {
  const cookieStore = await cookies()
  const unlocked = cookieStore.get(cookieName(caseKey))?.value === "1"

  async function unlockAction(formData: FormData) {
    "use server"

    const typed = String(formData.get("password") ?? "").trim()
    const expected = process.env[passwordEnvKey] ?? ""

    if (!expected) {
      // se você esquecer de setar a env, melhor falhar “fechado”
      redirect(`/${caseKey}?pw=1`)
    }

    if (typed === expected) {
      const store = await cookies()
      store.set(cookieName(caseKey), "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 dias
      })

      redirect(`/${caseKey}`)
    }

    redirect(`/${caseKey}?pw=1`)
  }

  if (unlocked) return <>{children}</>

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-12">
          {/* 6 col no desktop, centralizado */}
          <div className="col-span-4 lg:col-span-6 lg:col-start-4">
            <div className="mt-24 sm:mt-32 lg:mt-40">
              <div className="w-full rounded-3xl bg-white p-8 sm:p-10">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold tracking-wide text-neutral-400">
                      Ooopsie! Este case está protegido.
                    </p>

                    <p className="text-[28px] font-semibold leading-[1.15] text-black sm:text-[32px]">
                      Para ver o case completo, insira a senha.
                    </p>

                    <p className="text-base leading-[1.5] text-neutral-700">
                      As seções abaixo incluem detalhes de pesquisa e contexto do cliente.
                      Se você ainda não tem a senha, solicite por LinkedIn ou e-mail.
                    </p>

                    {wrongPassword && (
                      <p className="text-sm font-semibold text-[#FF4C2C]">
                        Senha incorreta. Se você não tem a senha, peça por LinkedIn ou e-mail.
                      </p>
                    )}
                  </div>

                  <form action={unlockAction} className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-neutral-600">
                      Senha
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Cole a senha aqui"
                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-base outline-none focus:border-neutral-400"
                    />
                    <button
                      type="submit"
                      className="h-12 w-full rounded-xl bg-black text-base font-semibold text-white"
                    >
                      Desbloquear case
                    </button>
                  </form>

                  <div className="flex flex-col gap-3 pt-2">
                    <Link
                      href={linkedinUrl}
                      className="text-sm font-semibold text-black underline underline-offset-4"
                    >
                      Solicitar a senha pelo LinkedIn
                    </Link>

                    <a
                      href={`mailto:${contactEmail}?subject=Senha%20do%20case%20${encodeURIComponent(
                        caseKey
                      )}`}
                      className="text-sm font-semibold text-black underline underline-offset-4"
                    >
                      Solicitar a senha por e-mail
                    </a>

                    <Link
                      href={nextHref}
                      className="pt-2 text-sm font-semibold text-neutral-500 hover:text-neutral-700"
                    >
                      Deixa pra lá — me mostra o próximo projeto
                    </Link>
                  </div>
                </div>
              </div>

              {/* um espacinho pra não “grudar” no fim da página */}
              <div className="h-24" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
