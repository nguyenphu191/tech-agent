"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"

const FALLBACK = "/images/default.png"

type SafeImageProps = Omit<ImageProps, "onError"> & {
  fallback?: string
}

export function SafeImage({ src, alt, fallback = FALLBACK, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return <Image src={fallback} alt={alt} {...props} />
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallback)
        setHasError(true)
      }}
      {...props}
    />
  )
}
