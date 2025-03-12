"use client"
import { motion } from "framer-motion"
import { FaEnvelope, FaGithub, FaLinkedin, FaNewspaper, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa"

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

const Home = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
      {/* Background gradient effect */}

      {/* Animated background dots */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-white text-3xl md:text-4xl font-light mb-2">
            Olá, eu sou o{" "}
            <motion.span
              className="block text-5xl md:text-7xl font-bold text-blue-500 mt-2 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Pedro
            </motion.span>
          </h1>

          <motion.h2
            className="text-gray-300 text-xl md:text-2xl font-light mb-8 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            FullStack Junior Developer
          </motion.h2>

          <motion.div
            className="flex flex-wrap justify-center gap-5 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-transparent hover:bg-blue-500/10 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
              >
                <span className="text-blue-500 text-xl group-hover:text-blue-400 transition-colors duration-300">
                  {link.icon}
                </span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs text-gray-400 whitespace-nowrap transition-opacity duration-300">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}

export default Home

