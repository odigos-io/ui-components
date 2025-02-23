import React, { type FC, useState } from 'react'
import { OdigosLogo } from '@odigos/ui-icons'

interface ImageControlledProps {
  src: string
  alt?: string
  size?: number
}

const ImageControlled: FC<ImageControlledProps> = ({ src = '', alt = '', size = 16 }) => {
  const [hasError, setHasError] = useState(false)

  if (!!src && !hasError) {
    return <img src={src} alt={alt} width={size} height={size} onError={() => setHasError(true)} />
  }

  return <OdigosLogo size={size} />
}

export { ImageControlled, type ImageControlledProps }
