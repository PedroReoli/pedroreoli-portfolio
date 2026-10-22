export const siteConfig = {
  name: "Pedro Reoli",
  legalName: "Pedro Lucas Reis",
  siteUrl: "https://pedroreis.vercel.app",
  email: "pedrosousa2160@gmail.com",
  social: {
    github: "https://github.com/PedroReoli",
    whatsapp: "https://wa.me/5524993264040",
    linkedin: "https://www.linkedin.com/in/pedro-lucas-reis-a93945171/",
  },
} as const

export const getSiteUrl = (pathname = "/") => new URL(pathname, `${siteConfig.siteUrl}/`).toString()

export const getMailtoUrl = () => `mailto:${siteConfig.email}`
