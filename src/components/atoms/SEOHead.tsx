import React, { useEffect } from "react"

interface SEOHeadProps {
  title: string
  description: string
  canonicalUrl?: string
  noIndex?: boolean
  locale?: "pt_BR" | "en_US"
  imageUrl?: string
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl = "https://pedroreis.vercel.app/",
  noIndex = false,
  locale = "pt_BR",
  imageUrl = "https://pedroreis.vercel.app/eu-profissional.png",
}) => {
  useEffect(() => {
    document.title = title

    const setNamedMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`)
      if (!element) {
        element = document.createElement("meta")
        element.setAttribute("name", name)
        document.head.appendChild(element)
      }
      element.setAttribute("content", content)
    }

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.setAttribute("rel", "canonical")
      document.head.appendChild(canonical)
    }
    canonical.setAttribute("href", canonicalUrl)

    const setPropertyMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`)
      if (!element) {
        element = document.createElement("meta")
        element.setAttribute("property", property)
        document.head.appendChild(element)
      }
      element.setAttribute("content", content)
    }

    setNamedMeta("description", description)
    setNamedMeta("twitter:card", "summary_large_image")
    setNamedMeta("twitter:title", title)
    setNamedMeta("twitter:description", description)
    setNamedMeta("twitter:url", canonicalUrl)
    setNamedMeta("twitter:image", imageUrl)

    setPropertyMeta("og:type", "website")
    setPropertyMeta("og:title", title)
    setPropertyMeta("og:description", description)
    setPropertyMeta("og:url", canonicalUrl)
    setPropertyMeta("og:image", imageUrl)
    setPropertyMeta("og:locale", locale)

    setNamedMeta("robots", noIndex ? "noindex, nofollow" : "index, follow")
  }, [title, description, canonicalUrl, noIndex, locale, imageUrl])

  return null
}

export default SEOHead
