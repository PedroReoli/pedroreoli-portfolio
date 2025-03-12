"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { blogPosts } from "@/constants/BlogData"
import { ArrowUpRight, Calendar } from "lucide-react"

const BlogSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-blue-500 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Blog<span className="text-white">;</span>
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface BlogCardProps {
  post: {
    id: string
    title: string
    description: string
    link: string
    date: string
  }
  index: number
  isInView: boolean
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index, isInView }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
    >
      <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 h-full flex flex-col transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 group">
        {/* Card content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Date */}
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-6 flex-grow">{post.description}</p>

          {/* Read more button */}
          <div className="flex items-center text-blue-400 font-medium text-sm mt-auto group-hover:text-blue-300 transition-colors">
            <span>Ler artigo</span>
            <ArrowUpRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </motion.a>
  )
}

export default BlogSection

