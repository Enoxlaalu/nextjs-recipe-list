export interface IRecipe {
  id: string
  slug: string
  satietyScore: number
  rating: number
  description: string
  descriptionHtml: string
  title: string
  images: {
    defaultImage: {
      path: string
      width: number
      height: number
    }
  }
}
