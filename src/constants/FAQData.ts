// Use string identifiers instead of direct JSX
export interface FAQItem {
  questionKey: string;  // Chave de tradução para a pergunta
  answerKey: string;    // Chave de tradução para a resposta
  contacts?: {
    type: string
    link: string
    iconType: "mail" | "instagram" | "github" | "linkedin"
    labelKey: string   // Chave de tradução para o label
  }[]
}

export const faqData: FAQItem[] = [
  {
    questionKey: "faq.questions.targetAudience.question",
    answerKey: "faq.questions.targetAudience.answer",
  },
  {
    questionKey: "faq.questions.projectTimeAndCost.question",
    answerKey: "faq.questions.projectTimeAndCost.answer",
  },
  {
    questionKey: "faq.questions.contact.question",
    answerKey: "faq.questions.contact.answer",
    contacts: [
      {
        type: "email",
        link: "mailto:pedrosousa2160@gmail.com",
        iconType: "mail",
        labelKey: "faq.contacts.email",
      },
      {
        type: "instagram",
        link: "https://www.instagram.com/01_dev_em_desenvolvimento",
        iconType: "instagram",
        labelKey: "faq.contacts.instagram",
      },
      {
        type: "github",
        link: "https://github.com/PedroReoli",
        iconType: "github",
        labelKey: "faq.contacts.github",
      },
      {
        type: "linkedin",
        link: "https://www.linkedin.com/in/pedro-lucas-reis-de-oliveira-sousa-a93945171/",
        iconType: "linkedin",
        labelKey: "faq.contacts.linkedin",
      },
    ],
  },
  {
    questionKey: "faq.questions.technologies.question",
    answerKey: "faq.questions.technologies.answer",
  },
]
