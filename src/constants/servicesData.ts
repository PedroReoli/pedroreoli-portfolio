export interface Service {
  iconType: "design" | "code" | "education"
  titleKey: string
  descriptionKey: string
}

export const servicesData: Service[] = [
  {
    iconType: "design",
    titleKey: "services.uxui.title",
    descriptionKey: "services.uxui.description",
  },
  {
    iconType: "code",
    titleKey: "services.fullstack.title",
    descriptionKey: "services.fullstack.description",
  },
  {
    iconType: "education",
    titleKey: "services.mentoring.title",
    descriptionKey: "services.mentoring.description",
  },
]
