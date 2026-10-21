import React from "react"

interface ResponsiveImageSource {
  srcSet: string
  type: string
  sizes?: string
}

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  sources: ResponsiveImageSource[]
  pictureClassName?: string
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  sources,
  pictureClassName,
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
    <img {...imageProps} />
  </picture>
)

export default ResponsiveImage
