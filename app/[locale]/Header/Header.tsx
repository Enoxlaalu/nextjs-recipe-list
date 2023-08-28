import { useTranslations } from "next-intl"
import styles from "./styles.module.scss"
import LocaleSwitcher from "@/app/[locale]/LocaleSwitcher/LocaleSwitcher"

const Header = () => {
  const t = useTranslations()

  return (
    <header className={styles.header}>
      <h1 data-testid="mainHeader">{t("header")}</h1>
      <LocaleSwitcher />
    </header>
  )
}

export default Header
