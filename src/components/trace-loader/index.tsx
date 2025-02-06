import React from 'react'
import Lottie from 'react-lottie'
import styled, { useTheme } from 'styled-components'
import animationData from './lottie.json'

interface TraceLoaderProps {
  width?: number
}

const Container = styled.div<{ $width: number; $height: number }>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  position: relative;
`

const TraceLoader: React.FC<TraceLoaderProps> = ({ width: w = 620 }) => {
  const { darkMode } = useTheme()
  const ratio = 620 / 220 // preserve aspect ratio
  const width = w / ratio
  const height = w

  return (
    // Note: The container width and height are swapped because the animation is rotated
    <Container $width={height} $height={width}>
      <Lottie
        width={width}
        height={height}
        isClickToPauseDisabled
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
        }}
        style={{
          transform: 'rotate(-90deg)',
          position: 'absolute',
          top: -(width - width / 10),
          left: width - width / 10,
          filter: darkMode ? 'invert(0)' : 'invert(1)',
        }}
      />
    </Container>
  )
}

export { TraceLoader, type TraceLoaderProps }
