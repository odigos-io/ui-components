import React, { type DetailedHTMLProps, type FC, type HTMLAttributes, type ReactNode } from 'react'
import styled from 'styled-components'

interface TextProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode
  color?: string
  size?: number
  weight?: number
  align?: 'left' | 'center' | 'right'
  family?: 'primary' | 'secondary'
  opacity?: number
  decoration?: string
}

const TextWrapper = styled.div<{
  $color?: TextProps['color']
  $size?: TextProps['size']
  $weight?: TextProps['weight']
  $align?: TextProps['align']
  $family?: TextProps['family']
  $opacity?: TextProps['opacity']
  $decoration?: TextProps['decoration']
}>`
  color: ${({ $color, theme }) => $color || theme.text.secondary};
  font-size: ${({ $size }) => ($size !== undefined ? $size : 16)}px;
  font-weight: ${({ $weight }) => ($weight !== undefined ? $weight : 300)};
  text-align: ${({ $align }) => $align || 'left'};
  opacity: ${({ $opacity }) => ($opacity !== undefined ? $opacity : 1)};
  text-decoration: ${({ $decoration }) => $decoration || 'none'};
  text-transform: ${({ $family }) => ($family === 'secondary' ? 'uppercase' : 'none')};
  font-family: ${({ theme, $family = 'primary' }) => theme.font_family[$family]};
`

const Text: FC<TextProps> = ({ children, color, size, weight, align, family, opacity, decoration, ...props }) => {
  return (
    <TextWrapper $color={color} $size={size} $weight={weight} $align={align} $family={family} $opacity={opacity} $decoration={decoration} {...props}>
      {children}
    </TextWrapper>
  )
}

export { Text, type TextProps }
