export interface Service {
  title: string
  description: string
  iconType: "design" | "code" | "education"
}

export const servicesData: Service[] = [
  {
    title: "UX / UI Design",
    description: "Desenho interfaces claras, objetivas e intuitivas, priorizando a experiência do usuário.",
    iconType: "design",
  },
  {
    title: "Desenvolvimento FullStack",
    description: "Construo soluções completas, desde interfaces até back-ends robustos e escaláveis.",
    iconType: "code",
  },
  {
    title: "Mentoria e Aulas",
    description: "Orientação personalizada para estudos, carreiras e projetos na área de programação.",
    iconType: "education",
  },
]

