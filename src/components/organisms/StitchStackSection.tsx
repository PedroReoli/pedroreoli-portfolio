import React from "react"
import Reveal from "../atoms/Reveal"
import { useLanguage } from "../../i18n/useLanguage"

const stackRows = [
  ["REACT", "TYPESCRIPT", "NODE.JS"],
  ["POSTGRES", "DOCKER", "AWS"],
  ["AI AGENTS", "MCP", "SYSTEMS"],
]

export const StitchStackSection: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <section className="stack-stage flex min-h-[100svh] items-center overflow-hidden bg-[#edeae4] py-16 text-[#111010] sm:py-20">
      <div className="editorial-container w-full">
        <Reveal className="grid gap-8 border-b border-black/20 pb-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="editorial-label mb-5 text-[#4f4c48]">
              {isEn ? "From idea to operation" : "Da ideia à operação"}
            </p>
            <h2 className="stack-headline max-w-6xl font-black uppercase">
              {isEn ? "Ideas matter when they work in the real world." : "Ideias ganham valor quando funcionam no mundo real."}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#5f5b56] lg:col-span-4 lg:text-lg">
            {isEn
              ? "I connect product, interface and architecture to turn intent into reliable software."
              : "Conecto produto, interface e arquitetura para transformar intenção em software confiável."}
          </p>
        </Reveal>

        <div className="mt-8 sm:mt-12">
          {stackRows.map((row, rowIndex) => (
            <Reveal
              key={row.join("-")}
              delay={rowIndex * 0.08}
              distance={24}
              className="stack-row flex w-max items-center gap-[0.18em] whitespace-nowrap font-black uppercase leading-[0.82] tracking-[-0.075em]"
            >
              {row.map((item, itemIndex) => (
                <React.Fragment key={item}>
                  <span className={rowIndex === 1 ? "stack-outline" : ""}>{item}</span>
                  {itemIndex < row.length - 1 && <span className="text-[#82aaff]">◆</span>}
                </React.Fragment>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StitchStackSection
