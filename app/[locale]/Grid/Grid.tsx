"use client"

import { IRecipe } from "@/app/types/types"
import React, { useEffect, useRef, useState } from "react"
import styles from "./styles.module.scss"
import Input from "@/app/components/Input/Input"
import { useKeyPress } from "@/app/hooks/useKeyPress"
import { getRecipes } from "@/app/[locale]/api/api"
import GridItem from "@/app/[locale]/GridItem/GridItem"
import Spinner from "@/app/components/Spinner/Spinner"

interface IGrid {
  recipes: IRecipe[]
}

const Grid: React.FC<IGrid> = ({ recipes }) => {
  const [data, setData] = useState(recipes)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const grid = useRef<HTMLUListElement | null>(null)

  const loadMore = async () => {
    const recipes = await getRecipes({ page: page + 1, query })
    setData([...data, ...recipes])
    setPage(page + 1)
  }

  const onChange = async (v: string) => {
    const recipes = await getRecipes({ page: 1, query: v })
    setData(recipes)
    grid.current?.scrollTo(0, 0)
    setQuery(v)
    setPage(1)
  }

  const arrowRightPressed = useKeyPress("ArrowRight")
  const arrowLeftPressed = useKeyPress("ArrowLeft")

  useEffect(() => {
    if (arrowRightPressed && activeIndex < data.length) {
      setActiveIndex(activeIndex + 1)
    }
  }, [arrowRightPressed])

  useEffect(() => {
    if (arrowLeftPressed && activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }, [arrowLeftPressed])

  return (
    <>
      <Input
        id="searchInput"
        value={""}
        onChange={onChange}
        className={styles.input}
      />
      {data.length ? (
        <>
          <ul data-testid="recipesGrid" className={styles.grid} ref={grid}>
            {data.map((r, index) => (
              <GridItem
                key={r.id}
                active={activeIndex === index}
                recipe={r}
                isLast={data.length >= 20 && data.length - 1 === index}
                loadMore={loadMore}
              />
            ))}
            {data.length >= 20 && <Spinner />}
          </ul>
        </>
      ) : (
        <p className={styles.noData}>No recipes available!</p>
      )}
    </>
  )
}

export default Grid
