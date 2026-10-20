import React from "react"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { useLanguage } from "../../i18n/useLanguage"

const notes = [
  {
    number: "01",
    category: "Agentes & IA",
    title: "Browser automation com CDP e árvore de acessibilidade",
    time: "12 min",
    href: "https://github.com/PedroReoli/Achilles-CDP-Agent",
  },
  {
    number: "02",
    category: "Arquitetura",
    title: "Produtos locais, rápidos e privados por padrão",
    time: "10 min",
    href: "https://github.com/PedroReoli/organon",
  },
  {
    number: "03",
    category: "Engenharia",
    title: "Contratos previsíveis entre TypeScript e runtime",
    time: "8 min",
    href: "https://github.com/PedroReoli",
  },
]

export const StitchMediaBlogSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="w-full">
      <section className="editorial-container pb-16 pt-20 sm:pb-24 sm:pt-28">
        <p className="editorial-label mb-5 text-[#82aaff]">{isEn ? "Writing / Press / Ideas" : "Escrita / Imprensa / Ideias"}</p>
        <h1 className="text-[clamp(4.5rem,17vw,16rem)] font-black leading-[0.72] tracking-[-0.085em]">NOTAS</h1>
        <p className="mt-12 max-w-2xl text-xl leading-tight tracking-[-0.035em] text-[#aaa6a0] sm:mt-20 sm:text-4xl">
          {isEn ? "Short notes about software, systems and the human side of technology." : "Notas curtas sobre software, sistemas e o lado humano da tecnologia."}
        </p>
      </section>

      <section className="editorial-container pb-24">
        <article className="grid gap-8 border-y border-white/10 py-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="editorial-label mb-5 text-[#82aaff]">{isEn ? "In the press" : "Na imprensa"}</p>
            <h2 className="text-[clamp(2.5rem,6vw,5.7rem)] font-bold leading-[0.9] tracking-[-0.065em]">
              {isEn ? "Technology that helps children find their voice." : "Tecnologia para ajudar crianças a encontrar sua voz."}
            </h2>
            <a href="https://www.unifoa.edu.br/noticias/egresso-plataforma-apoiar-criancas-fala/" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-white pb-2 text-xs font-semibold uppercase tracking-[0.13em]">
              {isEn ? "Read article" : "Ler reportagem"}<ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <figure className="aspect-[16/10] overflow-hidden bg-[#1b1a19] lg:col-span-7">
            <img src="/TCC-img2.png" alt="Pedro apresentando o FalaAtípica" className="h-full w-full object-cover" />
          </figure>
        </article>
      </section>

      <section className="editorial-container pb-32">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="section-display">LEITURAS</h2>
          <span className="editorial-label hidden text-[#77736f] sm:block">03 notas</span>
        </div>
        {notes.map((note) => (
          <a key={note.number} href={note.href} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[2.5rem_1fr_auto] gap-3 border-b border-white/10 py-7 sm:grid-cols-[4rem_1fr_10rem_auto] sm:items-center sm:py-10">
            <span className="editorial-label text-[#77736f]">{note.number}</span>
            <div>
              <p className="editorial-label mb-3 text-[#82aaff]">{note.category}</p>
              <h3 className="max-w-4xl text-2xl font-bold leading-tight tracking-[-0.045em] sm:text-5xl">{note.title}</h3>
            </div>
            <span className="editorial-label hidden text-[#77736f] sm:block">{note.time}</span>
            <ArrowUpRight className="h-5 w-5 text-[#82aaff] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        ))}
      </section>
    </div>
  )
}

export default StitchMediaBlogSection
