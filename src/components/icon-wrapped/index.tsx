import React, { forwardRef, useState } from 'react'
import styled from 'styled-components'
import { OdigosLogo } from '../../icons'
import { hexPercent } from '../../styles'
import { NOTIFICATION_TYPE, type SVG } from '../../@types'

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
    return `linear-gradient(180deg, ${clr + hexPercent['020']} 0%, ${clr + hexPercent['005']} 100%)`
  }};
`

const IconWrapped = forwardRef<HTMLDivElement, IconWrappedProps>(({ icon: Icon, src = '', alt = '', status, size = 36 }, ref) => {
  const [srcHasError, setSrcHasError] = useState(false)

  if (!!src && !srcHasError) {
    return (
      <Container ref={ref} $status={status} $size={size}>
        <img src={src} alt={alt} width={size - 16} height={size - 16} onError={() => setSrcHasError(true)} />
      </Container>
    )
  }

  return (
    <Container ref={ref} $status={status} $size={size}>
      {!!Icon ? <Icon size={size - 16} /> : <OdigosLogo size={size - 16} />}
    </Container>
  )
})

export { IconWrapped, type IconWrappedProps }
