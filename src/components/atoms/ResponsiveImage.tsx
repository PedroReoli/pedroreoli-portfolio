import React from "react"

interface ResponsiveImageSource {
  srcSet: string
  type: string
  sizes?: string
}

interface ResponsiveImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt"> {
  sources: ResponsiveImageSource[]
  pictureClassName?: string
  alt: string
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  sources,
  pictureClassName,
  alt,
  ...imageProps
}) => (
  <picture className={pictureClassName}>
    {sources.map((source) => (
      <source
        key={`${source.type}-${source.srcSet}`}
        srcSet={source.srcSet}
        type={source.type}
        sizes={source.sizes}
      />
    ))}
    <img {...imageProps} alt={alt} />
  </picture>
)

export default ResponsiveImage
