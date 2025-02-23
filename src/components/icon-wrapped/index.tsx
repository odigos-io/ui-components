import React, { type FC } from 'react'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { NOTIFICATION_TYPE } from '@odigos/ui-utils'
import { ImageControlled } from '../image-controlled'
import { OdigosLogo, type SVG } from '@odigos/ui-icons'

interface IconWrappedProps {
  icon?: SVG
  src?: string
  alt?: string
  status?: NOTIFICATION_TYPE
  size?: number
}

const Container = styled.div<{ $status: IconWrappedProps['status']; $size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 8px;
  background: ${({ $status, theme }) => {
    const clr = $status ? theme.text[$status] : theme.text.secondary
    return `linear-gradient(180deg, ${clr + Theme.opacity.hex['020']} 0%, ${clr + Theme.opacity.hex['005']} 100%)`
  }};
`

const IconWrapped: FC<IconWrappedProps> = ({ icon: Icon, src = '', alt = '', status, size = 36 }) => {
  return (
    <Container $status={status} $size={size}>
      {!!src ? <ImageControlled src={src} size={size - 16} /> : !!Icon ? <Icon size={size - 16} /> : <OdigosLogo size={size - 16} />}
    </Container>
  )
}

export { IconWrapped, type IconWrappedProps }
