import React, { type CSSProperties, type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react'
import { useTheme } from 'styled-components'
import { createAnimation } from './helpers/animation'
import { cssValue, parseLengthAndUnit } from './helpers/unitConverter'

interface FadeLoaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  loading?: boolean
  color?: string
  scale?: number
  speedMultiplier?: number
  cssOverride?: CSSProperties
}

const fade = createAnimation('FadeLoader', '50% {opacity: 0.3} 100% {opacity: 1}', 'fade')

const FadeLoader: FC<FadeLoaderProps> = ({
  loading = true,
  color: clr,
  scale = 1,
  speedMultiplier = 1,
  cssOverride = {},
  style = {},
  ...additionalprops
}) => {
  const theme = useTheme()
  if (!loading) return null

  const color = clr || theme.text.secondary
  const height = 4,
    width = 1.5,
    radius = 2,
    margin = 2

  const { value } = parseLengthAndUnit(margin)
  const radiusValue = value + 4.2,
    quarter = radiusValue / 2 + radiusValue / 5.5

  const wrapper: CSSProperties = {
    display: 'inherit',
    position: 'relative',
    fontSize: '0',
    top: radiusValue * scale,
    left: radiusValue * scale,
    width: `${radiusValue * 3}px`,
    height: `${radiusValue * 3}px`,
    scale,
    ...style,
    ...cssOverride,
  }

  const styles = (i: number): CSSProperties => {
    return {
      position: 'absolute',
      width: cssValue(width),
      height: cssValue(height),
      margin: cssValue(margin),
      backgroundColor: color,
      borderRadius: cssValue(radius),
      transition: '2s',
      animationFillMode: 'both',
      animation: `${fade} ${1.2 / speedMultiplier}s ${i * 0.12}s infinite ease-in-out`,
    }
  }

  return (
    <span style={wrapper} {...additionalprops}>
      <span
        style={{
          ...styles(1),
          top: `${radiusValue}px`,
          left: '0',
        }}
      />
      <span
        style={{
          ...styles(2),
          top: `${quarter}px`,
          left: `${quarter}px`,
          transform: 'rotate(-45deg)',
        }}
      />
      <span
        style={{
          ...styles(3),
          top: '0',
          left: `${radiusValue}px`,
          transform: 'rotate(90deg)',
        }}
      />
      <span
        style={{
          ...styles(4),
          top: `${-1 * quarter}px`,
          left: `${quarter}px`,
          transform: 'rotate(45deg)',
        }}
      />
      <span
        style={{
          ...styles(5),
          top: `${-1 * radiusValue}px`,
          left: '0',
        }}
      />
      <span
        style={{
          ...styles(6),
          top: `${-1 * quarter}px`,
          left: `${-1 * quarter}px`,
          transform: 'rotate(-45deg)',
        }}
      />
      <span
        style={{
          ...styles(7),
          top: '0',
          left: `${-1 * radiusValue}px`,
          transform: 'rotate(90deg)',
        }}
      />
      <span
        style={{
          ...styles(8),
          top: `${quarter}px`,
          left: `${-1 * quarter}px`,
          transform: 'rotate(45deg)',
        }}
      />
    </span>
  )
}

export { FadeLoader, type FadeLoaderProps }
