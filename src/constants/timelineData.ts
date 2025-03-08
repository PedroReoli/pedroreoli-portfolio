export interface TimelineEvent {
    periodo: string;
    empresa: string;
    cargo: string;
    descricao: string;
    detalhes: string;
    link?: string;
    status: "Finalizado" | "Em andamento";
    tags: string[];
  }
  
  export const timelineEvents: TimelineEvent[] = [
    {
      periodo: "07/2024 - 11/2024",
      empresa: "EvaTech",
      cargo: "Professor, Palestrante e Mentor",
      descricao:
        "Ministrei aulas, workshops e palestras sobre habilidades tecnológicas essenciais para o mercado de trabalho.",
      detalhes:
        "Além disso, trabalhei com conceitos básicos de IA, empoderando mães negras solteiras a ingressar no mundo da tecnologia.",
      link: "https://evatech2024.netlify.app",
      status: "Finalizado",
      tags: ["Educação", "IA", "Tecnologia"],
    },
    {
      periodo: "Em andamento",
      empresa: "DevEmDesenvolvimento",
      cargo: "Professor, Redator e Dono",
      descricao: "Plataforma educacional focada em novos entusiastas e programadores iniciantes.",
      detalhes:
        "Oferece cursos, blogs e projetos práticos para compartilhar conhecimento e impulsionar carreiras na área de tecnologia.",
      link: "https://devemdesenvolvimento.com.br",
      status: "Em andamento",
      tags: ["Educação", "Programação", "Blog"],
    },
    {
      periodo: "Em andamento",
      empresa: "AutoCom3",
      cargo: "Estagiário de Desenvolvimento",
      descricao: "Na Autocom3, aprofundei meus conhecimentos em Banco de Dados, ASP.NET, e C#.",
      detalhes: "Além de atuar como Tester de aplicações, em um ambiente profissional e humano.",
      link: "https://autocom3.com.br",
      status: "Em andamento",
      tags: ["Banco de Dados", "ASP.NET", "C#", "Tester"],
    },
  ];
  