import React, { useEffect } from "react"

interface SEOHeadProps {
  title: string
  description: string
  canonicalUrl?: string
  noIndex?: boolean
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl = "https://pedroreis.vercel.app/",
  noIndex = false,
}) => {
  useEffect(() => {
    // 1. Atualizar Título
    document.title = title

    // 2. Atualizar ou Criar Meta Description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement("meta")
      metaDesc.setAttribute("name", "description")
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute("content", description)

    // 3. Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }
    canonical.setAttribute("href", canonicalUrl)

    // 4. OpenGraph
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`)
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute("property", property)
        document.head.appendChild(el)
      }
      el.setAttribute("content", content)
    }

    setMeta("og:title", title)
    setMeta("og:description", description)
    setMeta("og:url", canonicalUrl)

    // 5. Robots NoIndex (se aplicável, ex: 404)
    let metaRobots = document.querySelector('meta[name="robots"]')
    if (noIndex) {
      if (!metaRobots) {
        metaRobots = document.createElement("meta")
        metaRobots.setAttribute("name", "robots")
        document.head.appendChild(metaRobots)
      }
      metaRobots.setAttribute("content", "noindex, nofollow")
    } else if (metaRobots) {
      metaRobots.setAttribute("content", "index, follow")
    }
  }, [title, description, canonicalUrl, noIndex])

  return null
}

export default SEOHead
