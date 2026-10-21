import React from "react"

interface FlagIconProps {
  country: "br" | "us"
  aspect?: "4x3" | "1x1"
  className?: string
  alt?: string
}

export const FlagIcon: React.FC<FlagIconProps> = ({
  country,
  aspect = "4x3",
  className = "w-4 h-3",
  alt,
}) => {
  const src = aspect === "1x1" ? `/flags/${country}-1x1.svg` : `/flags/${country}.svg`
  const defaultAlt = country === "br" ? "Bandeira do Brasil" : "United States Flag"

  return (
    <img
      src={src}
      alt={alt ?? defaultAlt}
      className={`inline-block object-cover shrink-0 select-none ${className}`}
      loading="eager"
      decoding="async"
    />
  )
}

export default FlagIcon
