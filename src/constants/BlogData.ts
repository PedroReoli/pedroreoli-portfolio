export interface BlogPost {
  id: string
  title: string
  description: string
  link: string
  date: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "sql-best-practices",
    title: "Boas Práticas em SQL",
    description:
      "Descubra como boas práticas como BIGINT, IDENTITY e colunas de log podem transformar o design de bancos de dados SQL, garantindo eficiência e escalabilidade.",
    link: "https://devemdesenvolvimento.netlify.app/post/boas-praticas-em-sql",
    date: "15 Fev 2024",
  },
  {
    id: "sql-basics",
    title: "Comandos Iniciais SQL",
    description:
      "Aprenda e pratique os comandos SQL básicos para começar a manipular dados em bancos de dados relacionais com facilidade.",
    link: "https://devemdesenvolvimento.netlify.app/post/comandos-iniciais-sql",
    date: "03 Jan 2024",
  },
  {
    id: "oop-systems",
    title: "POO: Estruturando Sistemas Reais",
    description:
      "Aprenda como a Programação Orientada a Objetos (POO) revoluciona o desenvolvimento de software. Com exemplos práticos do mundo real.",
    link: "https://devemdesenvolvimento.netlify.app/post/programao-orientada-a-objetos-estruturando-sistemas-reais",
    date: "22 Dez 2023",
  },
]

