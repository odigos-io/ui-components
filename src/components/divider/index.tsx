import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { hexPercent } from '../../styles'
import { NOTIFICATION_TYPE } from '../../@types'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  type?: NOTIFICATION_TYPE // this is to apply coloring to the divider
  thickness?: number
  length?: string
  margin?: string
}

const StyledDivider = styled.div<{
  $orientation?: DividerProps['orientation']
  $type?: DividerProps['type']
  $thickness?: DividerProps['thickness']
  $length?: DividerProps['length']
  $margin?: DividerProps['margin']
}>`
  width: ${({ $orientation, $thickness, $length }) => ($orientation === 'vertical' ? `${$thickness}px` : $length || '100%')};
  height: ${({ $orientation, $thickness, $length }) => ($orientation === 'horizontal' ? `${$thickness}px` : $length || '100%')};
  margin: ${({ $orientation, $margin }) => $margin || ($orientation === 'horizontal' ? '8px 0' : '0 8px')};
  background-color: ${({ $type, theme }) => (!!$type ? theme.text[$type] : theme.colors.border) + hexPercent['050']};
`

const Divider = forwardRef<HTMLDivElement, DividerProps>(({ orientation = 'horizontal', type, thickness = 1, length, margin }, ref) => {
  return <StyledDivider ref={ref} $orientation={orientation} $type={type} $thickness={thickness} $length={length} $margin={margin} />
})

export { Divider, type DividerProps }
