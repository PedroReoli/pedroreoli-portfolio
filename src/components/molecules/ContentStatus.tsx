import React from "react"
import { RotateCw } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "../../i18n/useLanguage"

interface ContentStatusProps {
  status: "loading" | "error"
  scope?: "page" | "section"
}

/** Estados transitórios ficam legíveis mesmo sem os módulos lazy ou as animações. */
export default function ContentStatus({ status, scope = "page" }: ContentStatusProps) {
  const { language } = useLanguage()
  const isEn = language === "en"
  const isPage = scope === "page"
  const isError = status === "error"
  const title = isPage
    ? isEn
      ? "This page couldn't load."
      : "Não foi possível carregar esta página."
    : isEn
    ? "This content couldn't load."
    : "Não foi possível carregar este conteúdo."
  const actionClass =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-xs font-semibold transition-colors hover:bg-[#edeae4] hover:text-[#111010]"

  return React.createElement(
    isPage ? "main" : "section",
    {
      ...(isPage ? { id: "main-content", tabIndex: -1 } : {}),
      "aria-busy": !isError,
      className:
        "grid min-h-screen place-items-center bg-[#111010] px-5 pb-10 pt-24 text-[#edeae4] focus:outline-none sm:px-8",
    },
    isError ? (
      <div className="w-full max-w-2xl border-t border-white/20 pt-8">
        <div role="alert">
          <p className="editorial-label mb-5 text-[#82aaff]">
            {isEn ? "Content unavailable" : "Conteúdo indisponível"}
          </p>
          {React.createElement(
            isPage ? "h1" : "h2",
            {
              className:
                "max-w-[20ch] text-[clamp(1.75rem,5vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.04em]",
            },
            title,
          )}
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#b9b5af] sm:text-base">
            {isEn
              ? "Check your connection and try again. If the problem continues, use another link in the menu."
              : "Confira sua conexão e tente novamente. Se o problema continuar, use outro link do menu."}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {/* React.lazy mantém a importação rejeitada em cache; recarregar permite uma nova tentativa. */}
          <button type="button" onClick={() => window.location.reload()} className={actionClass}>
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            {isEn ? "Try again" : "Tentar novamente"}
          </button>
          {isPage ? (
            <Link to="/" className={actionClass}>
              {isEn ? "Back to home" : "Voltar ao início"}
            </Link>
          ) : (
            <a href="#contato" className={actionClass}>
              {isEn ? "Get in touch" : "Ir para contato"}
            </a>
          )}
        </div>
      </div>
    ) : (
      <p role="status" className="editorial-label text-[#b9b5af]">
        {isPage
          ? isEn
            ? "Loading page"
            : "Carregando página"
          : isEn
          ? "Loading portfolio sections"
          : "Carregando seções do portfólio"}
      </p>
    ),
  )
}
