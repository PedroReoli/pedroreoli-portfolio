import React from "react"
import { useLanguage } from "../../i18n/useLanguage"
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import { ExternalLink } from "lucide-react"

export const StitchHeroProjects: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="relative w-full flex flex-col items-center overflow-hidden">
      {/* =========================================================================
          ATO 1: HERO EXECUTIVA (ESTILO GITHUB DARK SÓBRIO & DIRETO AO PONTO)
          ========================================================================= */}
      <section
        id="hero"
        className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-24 sm:pt-32 pb-10"
      >
        {/* Status de Disponibilidade Sênior */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-mono mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fb950] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3fb950]" />
          </span>
          <span className="text-[#3fb950] font-semibold">
            {isEn ? "Available for Senior Positions" : "Disponível para Posições Sênior & Projetos"}
          </span>
          <span className="text-[#8b949e] hidden xs:inline">&bull;</span>
          <span className="text-[#8b949e] hidden xs:inline">
            Volta Redonda, RJ &bull; Remoto / Híbrido
          </span>
        </div>

        {/* Foto Profissional em Destaque */}
        <div className="relative mb-6">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full p-1 bg-[#21262d] border border-[#30363d] shadow-lg">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#161b22]">
              <img
                src="/eu-profissional.png"
                alt="Pedro Lucas Reis — Engenheiro de Software Full Stack"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const target = e.currentTarget
                  target.onerror = null
                  target.src =
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBtxYDrcM1Qy-1E_8i5XEtqLBXfxC-nfmr2bWSoBDeLxNRDIKnqG6Cb0HjTebAtdmDlKV2pgKz4RrFg1jPQki67K4EAM5K2Ns5qoSobeVk95EbeCRrlRVt1OqVKSgrkYWPjpsJP7OIGFYL-S8r_E97TiZxs194cTKwJuTeArEUiwXQDFnF63JyHrVPm1jBLV9KNi_Bc2l0F1yL8Q5dY1X8ZdIiumZ_CgKvfcmQKWp8--BYN_AHNaTV9"
                }}
              />
            </div>
          </div>
        </div>

        {/* Nome Principal (Único H1 Semântico da Home) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#f0f6fc] tracking-tight leading-none mb-3">
          Pedro Lucas Reis
        </h1>

        {/* Cargo e Especialidade */}
        <h2 className="text-lg sm:text-2xl md:text-3xl font-medium text-[#58a6ff] tracking-tight max-w-3xl mb-8">
          {isEn
            ? "Full Stack Software Engineer & Systems Architect"
            : "Engenheiro de Software Full Stack & Arquiteto de Sistemas"}
        </h2>

        {/* Ações e Redes Oficiais (Com bibliotecas oficiais react-icons) */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
          {/* WhatsApp Executivo */}
          <a
            href="https://wa.me/5524993264040?text=Ol%C3%A1%20Pedro,%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>{isEn ? "WhatsApp Direct" : "Falar no WhatsApp"}</span>
          </a>

          {/* E-mail Mailto */}
          <a
            href="mailto:pedrosousa2160@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-[#f0f6fc] hover:text-[#58a6ff] font-medium text-sm transition-colors border border-[#30363d]"
          >
            <MdEmail className="w-4 h-4 text-[#58a6ff]" />
            <span>{isEn ? "Email Me" : "Enviar E-mail"}</span>
          </a>

          {/* GitHub Oficial */}
          <a
            href="https://github.com/PedroReoli"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-[#f0f6fc] hover:text-[#58a6ff] font-medium text-sm transition-colors border border-[#30363d]"
            title="GitHub de Pedro Lucas"
          >
            <FaGithub className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          {/* LinkedIn Oficial */}
          <a
            href="https://www.linkedin.com/in/pedro-lucas-reis-a93945171/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#161b22] hover:bg-[#21262d] text-[#f0f6fc] hover:text-[#58a6ff] font-medium text-sm transition-colors border border-[#30363d]"
            title="LinkedIn de Pedro Lucas"
          >
            <FaLinkedin className="w-4 h-4 text-[#0a66c2]" />
            <span>LinkedIn</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
          ATO 2: DESTAQUES DE IMPRENSA & PROVA SOCIAL LEGÍTIMA
          ========================================================================= */}
      <section
        id="reconhecimento-imprensa"
        className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-8"
      >
        <div className="flex flex-col gap-4">
          {/* Header da Seção de Imprensa */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
              <span className="text-xs font-mono font-semibold text-[#3fb950] uppercase tracking-wider">
                {isEn ? "Press & Public Recognition" : "Reconhecimento na Imprensa & Mídia"}
              </span>
            </div>
            <span className="text-xs font-mono text-[#8b949e]">
              JORNAL CORREIO DA MANHÃ &bull; PORTAL UNIFOA
            </span>
          </div>

          {/* Card Editorial Clean Estilo GitHub Dark */}
          <div className="rounded-xl bg-[#161b22] border border-[#30363d] p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Lado Esquerdo: Manchete, Citação e Links */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#21262d] border border-[#30363d] text-xs font-mono text-[#c9d1d9]">
                    Correio da Manhã
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#21262d] border border-[#30363d] text-xs font-mono text-[#58a6ff]">
                    UniFOA Notícias
                  </span>
                  <span className="text-xs font-mono text-[#8b949e]">
                    Julho / 2026
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] tracking-tight leading-snug">
                  {isEn
                    ? "UniFOA Alumnus Pedro Lucas Creates Tech Platform to Support Children with Speech Delay"
                    : "Egresso do UniFOA cria plataforma para apoiar crianças com atraso de fala"}
                </h3>

                <blockquote className="p-4 rounded-lg bg-[#0d1117] border-l-4 border-l-[#238636] border border-[#21262d] flex flex-col gap-1.5">
                  <p className="text-sm italic text-[#c9d1d9] leading-relaxed">
                    &ldquo;O FalaAtípica dá voz a quem ainda não pode falar, unindo a
                    criança, a família e os terapeutas em uma jornada contínua e
                    mensurável.&rdquo;
                  </p>
                  <cite className="text-xs font-mono text-[#3fb950] not-italic font-semibold">
                    &mdash; Pedro Lucas Reis, entrevista ao Correio da Manhã &amp; UniFOA
                  </cite>
                </blockquote>

                <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                  Ecossistema multiplataforma desenvolvido para apoiar crianças com
                  atraso de fala e TEA, com jogos clínicos de reforço positivo e telemetria
                  para fonoaudiólogos e psicólogos.
                </p>

                {/* Links Externos Oficiais com Ícones Limpos */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://www.correiodamanha.com.br/sul-fluminense/educacao/2026/07/303632-egresso-do-unifoa-cria-plataforma-de-auxilio-infantil.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] font-medium text-xs transition-colors border border-[#30363d]"
                  >
                    <span>Ler no Correio da Manhã</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8b949e]" />
                  </a>

                  <a
                    href="https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] font-medium text-xs transition-colors border border-[#30363d]"
                  >
                    <span>Ler no Portal UniFOA</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#58a6ff]" />
                  </a>
                </div>
              </div>

              {/* Lado Direito: Imagem do Congresso / TCC */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="w-full max-w-sm rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-lg flex flex-col">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0d1117] flex items-center justify-center p-2">
                    <img
                      src="/TCC-img2.png"
                      alt="3º Congresso Tudo é Ciência: No Combate à Desinformação — UniFOA"
                      className="w-full h-full object-contain rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 bg-[#161b22] border-t border-[#30363d] flex flex-col gap-1 text-center">
                    <span className="font-mono text-xs font-semibold text-[#f0f6fc]">
                      3º Congresso Tudo é Ciência &bull; UniFOA
                    </span>
                    <span className="text-[11px] text-[#8b949e]">
                      Apresentação &amp; publicação de artigo científico
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StitchHeroProjects
