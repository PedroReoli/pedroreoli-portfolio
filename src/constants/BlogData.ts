export interface BlogPost {
  id: string
  titleKey: string    // Chave de tradução para o título
  descriptionKey: string  // Chave de tradução para a descrição
  link: string
  date: string
}

export const blogPosts: BlogPost[] = [
  {
    // Entendendo Redes Neurais é o nome do primeiro post , 
    id: "sql-best-practices",
    titleKey: "blog.posts.sqlBestPractices.title",
    descriptionKey: "blog.posts.sqlBestPractices.description",
    link: "https://www.devemdesenvolvimento.com.br/blog/entendendo-redes-neurais",
    date: "15 Fev 2024",
  },
  {
    id: "sql-basics",
    titleKey: "blog.posts.sqlBasics.title",
    descriptionKey: "blog.posts.sqlBasics.description",
    link: "https://devemdesenvolvimento.vercel.app/post/comandos-iniciais-sql",
    date: "03 Jan 2024",
  },
  {
    id: "oop-systems",
    titleKey: "blog.posts.oopSystems.title",
    descriptionKey: "blog.posts.oopSystems.description",
    link: "https://devemdesenvolvimento.vercel.app/post/programao-orientada-a-objetos-estruturando-sistemas-reais",
    date: "22 Dez 2023",
  },
]
