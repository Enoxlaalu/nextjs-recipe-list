"use client"

import { IRecipe } from "@/app/types/types"
import React, { useEffect, useRef } from "react"
import Image from "next/image"
import styles from "./styles.module.scss"

interface IGridItem {
  recipe: IRecipe
  loadMore: () => void
  isLast: boolean
  active: boolean
}

const GridItem: React.FC<IGridItem> = ({
  recipe,
  loadMore,
  isLast,
  active,
}) => {
  const { title, description, images, slug, satietyScore, rating } = recipe
  const {
    defaultImage: { path, width, height },
  } = images

  const cardRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!cardRef?.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        loadMore()
        observer.unobserve(entry.target)
      }
    })

    observer.observe(cardRef.current)
  }, [isLast])

  return (
    <li
      className={styles.item}
      ref={cardRef}
      role="button"
      aria-pressed={active}
      tabIndex={0}
    >
      <div className={styles.imageContainer}>
        <Image
          src={`https://i.dietdoctor.com/${path}`}
          alt={slug}
          width={width}
          height={height}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            aspectRatio: "2/3",
          }}
          quality={1}
        />
      </div>
      <div className={styles.textContainer}>
        <h2>{title}</h2>
        <div className={styles.numbersContainer}>
          <div className={styles.score}>
            <span>Satiety Score</span>
            <b>{satietyScore?.toFixed(2) || "-"}</b>
          </div>
          <div className={styles.score}>
            <span>Rating</span>
            <b>{rating}</b>
          </div>
        </div>
        <p>{description}</p>
      </div>
    </li>
  )
}

export default GridItem
