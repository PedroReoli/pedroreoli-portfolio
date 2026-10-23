import React, { useState } from "react"

interface ResponsiveImageSource {
  srcSet: string
  type: string
  sizes?: string
}

interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "alt"> {
  sources: ResponsiveImageSource[]
  pictureClassName?: string
  alt: string
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  sources,
  pictureClassName,
  alt,
  srcSet,
  onError,
  ...imageProps
}) => {
  const sourceKey = JSON.stringify([imageProps.src, srcSet, sources])
  const [failedSources, setFailedSources] = useState<string | null>(null)
  const useOriginal = failedSources === sourceKey

  const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    const image = event.currentTarget
    // <picture> seleciona formatos, mas não troca para o original em falhas de rede.
    // Ao falhar o original, preserva o alt e não cria um ciclo de tentativas.
    if (!useOriginal && imageProps.src && image.currentSrc !== image.src) {
      setFailedSources(sourceKey)
    }
    onError?.(event)
  }

  return (
    <picture className={pictureClassName}>
      {!useOriginal &&
        sources.map((source) => (
          <source
            key={`${source.type}-${source.srcSet}`}
            srcSet={source.srcSet}
            type={source.type}
            sizes={source.sizes}
          />
        ))}
      <img
        {...imageProps}
        srcSet={useOriginal ? undefined : srcSet}
        alt={alt}
        onError={handleError}
      />
    </picture>
  )
}

export default ResponsiveImage
