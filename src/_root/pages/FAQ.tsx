"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Tilt } from "react-tilt"
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

const defaultTiltOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.02,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
}

const FAQ = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <section
      ref={ref}
      className="text-white min-h-screen py-10 xxs:py-12 xs:py-14 sm:py-16 px-3 xxs:px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Section background with subtle glow */}
      <div className="absolute inset-0 bg-cosmic-bg/80 backdrop-blur-sm"></div>

      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 2 + 1
          const colors = ["#F9A8D4", "#C4B5FD", "#93C5FD", "#FFFFFF"]
          const color = colors[i % colors.length]

          return (
            <motion.div
              key={`faq-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 3}px ${size}px ${color}`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
              animate={{
                opacity: [Math.random() * 0.7 + 0.3, Math.random() * 0.9 + 0.5, Math.random() * 0.7 + 0.3],
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          )
        })}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-xl xxs:text-2xl xs:text-3xl sm:text-4xl font-bold text-center mb-8 xxs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Perguntas Frequentes<span className="text-cosmic-accent">;</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 gap-4 xxs:gap-5 xs:gap-6 sm:gap-8 md:grid-cols-2 md:gap-6 lg:gap-8"
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
            >
              <Tilt options={defaultTiltOptions}>
                <div className="relative group">
                  {/* Card glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cosmic-accent to-cosmic-accent rounded-xl xxs:rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />

                  {/* Card content */}
                  <div className="relative flex flex-col p-4 xxs:p-5 xs:p-6 sm:p-7 bg-cosmic-card rounded-xl xxs:rounded-2xl border border-cosmic-border hover:border-cosmic-accent/50 transition-colors duration-300">
                    {/* Question with toggle */}
                    <button
                      className="flex items-center justify-between gap-3 text-left mb-3 xxs:mb-4 group/question"
                      onClick={() => toggleFaq(index)}
                    >
                      <h3 className="text-sm xxs:text-base xs:text-lg sm:text-xl font-bold text-cosmic-accent group-hover/question:text-white transition-colors duration-300">
                        {faq.question}
                      </h3>
                      <div className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-cosmic-border bg-cosmic-bg/50">
                        {expandedFaq === index ? (
                          <ChevronUp className="w-4 h-4 text-cosmic-accent" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-cosmic-accent" />
                        )}
                      </div>
                    </button>

                    {/* Answer */}
                    <AnimatePresence>
                      <motion.div
                        initial={{ height: expandedFaq === index ? "auto" : 0, opacity: expandedFaq === index ? 1 : 0 }}
                        animate={{ height: expandedFaq === index ? "auto" : 0, opacity: expandedFaq === index ? 1 : 0 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs xxs:text-sm sm:text-base text-cosmic-text mb-4 xxs:mb-5">{faq.answer}</p>

                        {/* Contacts Section */}
                        {faq.contacts && (
                          <div className="mt-auto">
                            {/* Mobile Version (até 425px) */}
                            <div className="flex justify-center gap-2 xxs:gap-3 xs:hidden">
                              {faq.contacts.map((contact, idx) => (
                                <motion.a
                                  key={idx}
                                  href={contact.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="relative group/contact"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cosmic-accent to-cosmic-accent rounded-xl blur opacity-0 group-hover/contact:opacity-20 transition duration-300" />
                                  <div className="relative flex items-center justify-center w-10 xxs:w-11 xs:w-12 h-10 xxs:h-11 xs:h-12 bg-cosmic-card rounded-xl border border-cosmic-border group-hover/contact:border-cosmic-accent/50 transition-all duration-300">
                                    <div className="text-cosmic-accent w-5 xxs:w-6 h-5 xxs:h-6 group-hover/contact:text-white transition-colors duration-300">
                                      {contact.icon}
                                    </div>
                                  </div>
                                </motion.a>
                              ))}
                            </div>

                            {/* Tablet/Desktop Version (425px+) */}
                            <div className="hidden xs:flex xs:flex-col xs:space-y-2.5">
                              {faq.contacts.map((contact, idx) => (
                                <motion.a
                                  key={idx}
                                  href={contact.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="relative group/contact"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cosmic-accent to-cosmic-accent rounded-xl blur opacity-0 group-hover/contact:opacity-20 transition duration-300" />
                                  <div className="relative flex items-center gap-3 p-2 xs:p-3 bg-cosmic-card rounded-xl border border-cosmic-border group-hover/contact:border-cosmic-accent/50 transition-all duration-300">
                                    <div className="flex items-center justify-center w-8 xs:w-9 h-8 xs:h-9">
                                      <div className="text-cosmic-accent w-4 xs:w-5 h-4 xs:h-5 group-hover/contact:text-white transition-colors duration-300">
                                        {contact.icon}
                                      </div>
                                    </div>
                                    <span className="text-sm xs:text-base text-cosmic-text group-hover/contact:text-cosmic-accent transition-colors duration-300 truncate">
                                      {contact.label}
                                    </span>
                                  </div>
                                </motion.a>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ

