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
          ATO 2: DESTAQUES DE IMPRENSA & PROVA SOCIAL (EDITORIAL SHOWCASE)
          ========================================================================= */}
      <section
        id="reconhecimento-imprensa"
        className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-10"
      >
        <div className="flex flex-col gap-5">
          {/* Header da Seção de Imprensa */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#30363d] pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950] animate-pulse" />
              <h2 className="text-sm sm:text-base font-bold font-mono text-[#f0f6fc] uppercase tracking-wider">
                {isEn ? "Press & Public Recognition" : "Reconhecimento na Imprensa & Mídia"}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8b949e]">
              <span>JORNAL CORREIO DA MANHÃ</span>
              <span>&bull;</span>
              <span>PORTAL UNIFOA</span>
            </div>
          </div>

          {/* Master Card Editorial Estilo GitHub Dark */}
          <div className="rounded-2xl bg-[#161b22] border border-[#30363d] overflow-hidden shadow-2xl flex flex-col">
            {/* Topo: Badges de Cobertura */}
            <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#21262d] bg-[#0d1117]/60">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#21262d] border border-[#30363d] text-xs font-mono font-semibold text-[#f0f6fc]">
                  Correio da Manhã
                </span>
                <span className="px-3 py-1 rounded-md bg-[#21262d] border border-[#30363d] text-xs font-mono font-semibold text-[#3fb950]">
                  UniFOA Notícias
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#0d1117] text-xs font-mono text-[#8b949e] border border-[#21262d]">
                  Destaque Regional
                </span>
              </div>
              <span className="text-xs font-mono text-[#8b949e]">
                Julho / 2026 &bull; Educação &amp; Saúde Assistiva
              </span>
            </div>

            {/* Conteúdo Editorial */}
            <div className="p-6 sm:p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f0f6fc] tracking-tight leading-tight">
                  {isEn
                    ? "UniFOA Alumnus Pedro Lucas Creates Tech Platform to Support Children with Speech Delay"
                    : "Egresso do UniFOA cria plataforma para apoiar crianças com atraso de fala"}
                </h3>
                <p className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed max-w-4xl">
                  {isEn
                    ? "FalaAtípica was conceived, architected, and engineered by Pedro Lucas Reis as an assistive digital health ecosystem designed to bridge children with speech delay and ASD to clinicians, therapists, and families through clinically validated games and telemetry."
                    : "O FalaAtípica foi concebido, arquitetado e desenvolvido por Pedro Lucas Reis como um ecossistema digital de saúde assistiva, conectando crianças com atraso no desenvolvimento da fala e TEA a terapeutas, psicólogos e familiares por meio de mecânicas lúdicas de reforço positivo e telemetria clínica."}
                </p>
              </div>

              {/* Bloco de Citação Editorial */}
              <blockquote className="p-5 sm:p-6 rounded-xl bg-[#0d1117] border-l-4 border-l-[#238636] border border-[#21262d] flex flex-col gap-2">
                <p className="text-base sm:text-lg italic text-[#f0f6fc] leading-relaxed">
                  &ldquo;O FalaAtípica dá voz a quem ainda não pode falar, unindo a criança, a família e os terapeutas em uma jornada contínua, acolhedora e mensurável.&rdquo;
                </p>
                <cite className="text-xs font-mono text-[#3fb950] not-italic font-semibold">
                  &mdash; Pedro Lucas Reis, entrevista ao Jornal Correio da Manhã &amp; Portal UniFOA
                </cite>
              </blockquote>

              {/* Botões de Acesso às Reportagens Oficiais */}
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="https://www.correiodamanha.com.br/sul-fluminense/educacao/2026/07/303632-egresso-do-unifoa-cria-plataforma-de-auxilio-infantil.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] hover:text-white font-medium text-xs sm:text-sm transition-all border border-[#30363d] shadow-sm hover:border-[#8b949e]"
                >
                  <span>Ler reportagem no Correio da Manhã</span>
                  <ExternalLink className="w-4 h-4 text-[#8b949e]" />
                </a>

                <a
                  href="https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] hover:text-[#3fb950] font-medium text-xs sm:text-sm transition-all border border-[#30363d] shadow-sm hover:border-[#3fb950]"
                >
                  <span>Ler matéria no Portal UniFOA</span>
                  <ExternalLink className="w-4 h-4 text-[#3fb950]" />
                </a>
              </div>

              {/* Showcase Widescreen da Foto Oficial (Proporção Natural 1280x577) */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="relative w-full rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-xl group">
                  <div className="relative w-full overflow-hidden aspect-[1280/577]">
                    <img
                      src="/TCC-img2.png"
                      alt="Pedro Lucas Reis apresentando a plataforma FalaAtípica no Centro Universitário de Volta Redonda (UniFOA)"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/70 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Legenda Técnica da Foto */}
                <div className="px-3.5 py-2.5 rounded-lg bg-[#0d1117] border border-[#21262d] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#8b949e]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
                    <span className="text-[#c9d1d9] font-medium">
                      Registro Fotográfico Oficial: Apresentação e Demonstração Técnica do FalaAtípica
                    </span>
                  </div>
                  <span>Auditório UniFOA &bull; Volta Redonda - RJ</span>
                </div>
              </div>

              {/* 3 Pilares Técnicos de Impacto */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-[#0d1117] border border-[#21262d] flex flex-col gap-1.5">
                  <span className="text-[11px] font-mono text-[#3fb950] uppercase tracking-wider font-semibold">
                    Validação Clínica
                  </span>
                  <p className="text-xs text-[#8b949e] leading-relaxed">
                    Jogos estruturados com fonoaudiólogos e psicólogos para reforço positivo da fala.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0d1117] border border-[#21262d] flex flex-col gap-1.5">
                  <span className="text-[11px] font-mono text-[#3fb950] uppercase tracking-wider font-semibold">
                    Acessibilidade WCAG 2.2
                  </span>
                  <p className="text-xs text-[#8b949e] leading-relaxed">
                    Interface de alto contraste, elementos ampliados e navegação adaptada para uso infantil.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0d1117] border border-[#21262d] flex flex-col gap-1.5">
                  <span className="text-[11px] font-mono text-[#3fb950] uppercase tracking-wider font-semibold">
                    Telemetria em Tempo Real
                  </span>
                  <p className="text-xs text-[#8b949e] leading-relaxed">
                    Dashboards de tempo de resposta, acertos e evolução diária para acompanhamento clínico.
                  </p>
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
