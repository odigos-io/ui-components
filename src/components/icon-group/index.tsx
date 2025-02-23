import React, { useId, type FC } from 'react'
import { Text } from '../text'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { type SVG } from '@odigos/ui-icons'
import { IconWrapped } from '../icon-wrapped'
import { NOTIFICATION_TYPE } from '@odigos/ui-utils'

interface IconGroupProps {
  icons?: SVG[]
  iconSrcs?: string[]
  status?: NOTIFICATION_TYPE
  size?: number
}

const Container = styled.div<{ $size: number }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
`

const IconWrapper = styled.div<{ $status: IconGroupProps['status']; $size: number; $top: number; $left: number; $zIndex: number }>`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  z-index: ${({ $zIndex }) => $zIndex};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 100%;
  border: 2px solid ${({ $status, theme }) => ($status ? theme.text[$status] : theme.colors.primary)};
  background: ${({ $status, theme }) => ($status ? theme.colors[$status] : theme.colors.info)};
`

const IconGroup: FC<IconGroupProps> = ({ icons = [], iconSrcs = [], status, size = 36 }) => {
  const theme = Theme.useTheme()
  const imgSize = icons.length === 1 || iconSrcs.length === 1 ? size - 16 : size / 3

  if (!!iconSrcs.length) {
    return (
      <IconGroup
        icons={iconSrcs.map((src) => (() => <img src={src} alt='' width={imgSize} height={imgSize} />) as unknown as SVG)}
        status={status}
        size={size}
      />
    )
  }

  if (icons.length === 1) {
    return <IconWrapped icon={icons[0]} status={status} size={size} />
  }

  return (
    <Container $size={size}>
      {icons.map((Icon, idx) => {
        const keyId = useId()
        if (idx > 2) return null

        return (
          <IconWrapper
            key={keyId}
            $status={status}
            $size={imgSize * 1.5}
            $top={icons.length > 2 ? (idx === 0 || idx === 1 ? 0 : imgSize * 1.4) : imgSize * 0.7}
            $left={idx >= 2 ? imgSize * 0.7 : idx % 2 === 0 ? 0 : imgSize * 1.4}
            $zIndex={idx + 1}
          >
            {idx === 2 && icons.length > 3 ? (
              <Text family='secondary' color={theme.text.dark_grey} size={imgSize * 0.8}>
                +{icons.length - 2}
              </Text>
            ) : (
              <Icon size={imgSize} />
            )}
          </IconWrapper>
        )
      })}
    </Container>
  )
}

export { IconGroup, type IconGroupProps }
