"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Mail, Instagram, ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Quem é o seu público-alvo?",
    answer:
      "Meu público-alvo são desenvolvedores iniciantes, pessoas que desejam se aventurar no mundo da programação e clientes que buscam projetos personalizados. Também ofereço dicas e orientações para melhorar currículos e se destacar no mercado.",
  },
  {
    question: "Qual é o prazo médio e o custo de um projeto?",
    answer:
      "Projetos simples geralmente são concluídos entre 1 a 2 semanas, enquanto projetos complexos podem levar de 1 a 3 meses. Para obter informações detalhadas sobre custos, entre em contato diretamente.",
  },
  {
    question: "Como posso entrar em contato?",
    answer: "Você pode me encontrar pelos canais abaixo:",
    contacts: [
      { type: "email", link: "mailto:pedrosousa2160@gmail.com", icon: <Mail />, label: "pedrosousa2160@gmail.com" },
      {
        type: "instagram",
        link: "https://www.instagram.com/01_dev_em_desenvolvimento",
        icon: <Instagram />,
        label: "@01_dev_em_desenvolvimento",
      },
    ],
  },
  {
    question: "Quais tecnologias você domina?",
    answer:
      "Trabalho com uma ampla variedade de tecnologias, incluindo React, Node.js, TypeScript, C#, ASP.NET e bancos de dados como SQL e MongoDB. Sempre busco usar a melhor solução para cada projeto.",
  },
]

const FAQ = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <section
      ref={ref}
      className="text-white min-h-screen py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1120]/90 via-[#0F172A]/80 to-[#0A1120]/90 backdrop-blur-sm"></div>

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] bg-repeat opacity-5"></div>

        {/* Glowing orb */}
        <motion.div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 80%)`,
            width: "40rem",
            height: "40rem",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Perguntas Frequentes<span className="text-blue-400">;</span>
        </motion.h2>

        <motion.div
          className="space-y-4 sm:space-y-6"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.1,
                  },
                },
              }}
              className="relative"
            >
              <div className="relative bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-500/20 overflow-hidden transition-all duration-300 hover:border-blue-400/30">
                {/* Question with toggle */}
                <button
                  className="flex items-center justify-between gap-3 w-full p-5 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-base sm:text-lg font-medium text-white">{faq.question}</h3>
                  <div className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-blue-500/30 bg-blue-900/50">
                    {expandedFaq === index ? (
                      <ChevronUp className="w-4 h-4 text-blue-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-blue-500/20">
                        <p className="text-sm sm:text-base text-blue-200/80 mb-4">{faq.answer}</p>

                        {/* Contacts Section */}
                        {faq.contacts && (
                          <div className="space-y-2">
                            {faq.contacts.map((contact, idx) => (
                              <a
                                key={idx}
                                href={contact.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-lg bg-blue-900/30 border border-blue-500/20 hover:border-blue-400/30 transition-colors"
                              >
                                <div className="text-blue-400 w-5 h-5">{contact.icon}</div>
                                <span className="text-sm text-blue-200">{contact.label}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ

