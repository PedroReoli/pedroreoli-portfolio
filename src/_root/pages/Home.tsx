"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaYoutube, FaInstagram, FaNewspaper } from "react-icons/fa"

const Home = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="text-white min-h-screen w-full relative pt-16 md:pt-24 flex items-center justify-center"
    >
      {/* Background - keeping transparent with the grid pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-transparent"></div>
        <div className="absolute inset-0 opacity-5 bg-[url('/assets/grid-pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Main card */}
        <motion.div
          className="w-full max-w-4xl mx-auto bg-transparent backdrop-blur-sm border border-blue-500/20 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Card header with blue gradient */}
          <div className="h-3 w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>

          {/* Card content */}
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              {/* Intro text */}
              <motion.p
                className="text-blue-400 text-lg mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Olá, eu sou o
              </motion.p>

              {/* Name with emphasis */}
              <motion.h1
                className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">Pedro</span>
              </motion.h1>

              <motion.p
                className="text-xl sm:text-2xl text-blue-200 mb-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Desenvolvedor Fullstack Júnior
              </motion.p>

              {/* Divider with improved animation */}
              <motion.div
                className="w-24 h-0.5 bg-blue-500/30 mb-8"
                initial={{ width: 0 }}
                animate={isInView ? { width: 96 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              />

              {/* Social icons in a grid with improved layout */}
              <motion.div
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-5 w-full max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:text-white hover:border-blue-400 transition-all duration-200"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    aria-label={link.label}
                  >
                    <span className="text-xl">{link.icon}</span>
                  </motion.a>
                ))}
              </motion.div>

          
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const socialLinks = [
  { href: "mailto:pedrosousa2160@gmail.com", icon: <FaEnvelope />, label: "Email" },
  { href: "https://github.com/PedroReoli", icon: <FaGithub />, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/pedro-lucas-reis-de-oliveira-sousa-a93945171/",
    icon: <FaLinkedin />,
    label: "LinkedIn",
  },
  { href: "https://devemdesenvolvimento.netlify.app/", icon: <FaNewspaper />, label: "Blog" },
  { href: "https://www.youtube.com/@DevDesenvolvimento", icon: <FaYoutube />, label: "YouTube" },
  { href: "https://www.instagram.com/01_dev_em_desenvolvimento", icon: <FaInstagram />, label: "Instagram" },
  { href: "https://x.com/opedroreoli", icon: <FaTwitter />, label: "Twitter" },
]

export default Home

