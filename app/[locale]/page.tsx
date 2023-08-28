import { getRecipes } from "@/app/[locale]/api/api"
import Grid from "@/app/[locale]/Grid/Grid"
import Header from "@/app/[locale]/Header/Header"
import styles from "./page.module.scss"

const RecipeListPage = async () => {
  const recipes = await getRecipes()

  return (
    <main className={styles.page}>
      <Header />
      <Grid recipes={recipes} />
    </main>
  )
}

export default RecipeListPage
