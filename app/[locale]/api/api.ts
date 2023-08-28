import client from "@/apollo-client"
import { ApolloQueryResult, gql } from "@apollo/client"
import { IRecipe } from "@/app/types/types"

interface IRecipes {
  listRecipes: {
    recipes: IRecipe[]
  }
}

interface IInput {
  page?: number
  query?: string | null
}

export const getRecipes = async (input: IInput = {}) => {
  const { page = 1, query = null } = input

  const { data }: ApolloQueryResult<IRecipes> = await client.query({
    query: gql`
      query ListRecipes($input: ListRecipesInput) {
        listRecipes(input: $input) {
          recipes {
            id
            slug
            satietyScore
            rating
            description
            descriptionHtml
            title
            images {
              defaultImage {
                path
                width
                height
              }
            }
          }
        }
      }
    `,
    variables: {
      input: {
        query: query ?? null,
        pageSize: 20,
        page,
      },
    },
  })

  return data.listRecipes.recipes
}
