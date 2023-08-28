"use client"

import { usePathname, useRouter } from "next-intl/client"
import { useLocale } from "next-intl"
import styles from "./styles.module.scss"
import { Fragment } from "react"

const LocaleSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  return (
    <div className={styles.languageSelect}>
      {["en", "es"].map((l, index) => {
        const onClick = () => {
          router.replace(pathname, { locale: l })
        }

        return (
          <Fragment key={l}>
            <span
              onClick={onClick}
              className={locale === l ? styles.active : ""}
            >
              {l.toUpperCase()}
            </span>
            {index % 2 === 0 && "|"}
          </Fragment>
        )
      })}
    </div>
  )
}

export default LocaleSwitcher
