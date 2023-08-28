"use client"

import styles from "./styles.module.scss"
import React, { memo, SyntheticEvent, useCallback, useState } from "react"
import debounce from "@/app/utils/debounce"

interface IInput {
  id: string
  value: string
  onChange: (v: string) => void
  className?: string
  endIcon?: string
}

const Input: React.FC<IInput> = memo(
  ({ id, value, onChange, className, endIcon }) => {
    const [inputValue, setValue] = useState(value)

    const debouncedChange = useCallback(
      debounce((v: string) => {
        onChange(v)
      }, 2000),
      [],
    )

    const handleChange = (e: SyntheticEvent) => {
      const value = (e.target as HTMLInputElement).value

      setValue(value)
      debouncedChange(value)
    }

    return (
      <div className={`${styles.input} ${className}`}>
        <input id={id} type="text" value={inputValue} onChange={handleChange} />
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </div>
    )
  },
)

export default Input
