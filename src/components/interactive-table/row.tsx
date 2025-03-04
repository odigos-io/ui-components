import React, { FC, useId, useState } from 'react'
import { Text } from '../text'
import { Tooltip } from '../tooltip'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { ColumnCell, RowCell } from '.'
import { IconWrapped } from '../icon-wrapped'
import { isEmpty, NOTIFICATION_TYPE, useContainerSize } from '@odigos/ui-utils'

interface RowProps {
  index: number
  columns: ColumnCell[]
  cells: RowCell[]
  onClick?: () => void
  status?: NOTIFICATION_TYPE
  faded?: boolean
}

const TableRow = styled.tr<{ $withHover: boolean; $faded?: boolean }>`
  cursor: ${({ $withHover }) => ($withHover ? 'pointer' : 'default')};
  opacity: ${({ $faded }) => ($faded ? 0.5 : 1)};
`

const TableData = styled.td<{ $isFirst: boolean }>`
  position: relative;
  width: fit-content;
  padding: 16px 8px 16px ${({ $isFirst }) => ($isFirst ? '16px' : '8px')};
  color: ${({ theme }) => theme.text.secondary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 14px;
  white-space: nowrap;
`

const RowText = styled(Text)<{ $color: RowCell['textColor'] }>`
  font-size: 14px;
  color: ${({ $color, theme }) => $color ?? theme.text.secondary};
  line-height: 16px;
  text-wrap: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  webkit-line-clamp: 2;
  webkit-box-orient: vertical;
`

const RowBackground = styled.div<{ $height: number; $width: number; $top: number; $hovered: boolean; $status?: NOTIFICATION_TYPE }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border-radius: 16px;
  background-color: ${({ theme, $hovered, $status }) =>
    $hovered
      ? !!$status
        ? theme.text[$status] + Theme.opacity.hex['020']
        : theme.colors.majestic_blue + Theme.opacity.hex['030']
      : !!$status
      ? theme.text[$status] + Theme.opacity.hex['010']
      : theme.colors.secondary + Theme.opacity.hex['005']};
`

const Row: FC<RowProps> = ({ index, columns, cells, onClick, status, faded }) => {
  const { containerRef, containerHeight, containerWidth } = useContainerSize()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <TableRow
      // @ts-ignore
      ref={containerRef}
      onMouseEnter={() => !!onClick && setIsHovered(true)}
      onMouseLeave={() => !!onClick && setIsHovered(false)}
      onClick={() => !!onClick && onClick()}
      $withHover={!!onClick}
      $faded={faded}
    >
      {columns.map(({ key }, i) => {
        const rowCell = cells.find(({ columnKey }) => columnKey === key)
        if (!rowCell) return null
        const { value, textColor, withTooltip, icon, component: Component } = rowCell

        return (
          <TableData key={useId()} $isFirst={i === 0}>
            {!!icon ? (
              <IconWrapped icon={icon} />
            ) : !!Component ? (
              <Component />
            ) : (
              <Tooltip text={withTooltip && !!value ? String(value) : ''}>
                <RowText $color={textColor}>{!isEmpty(value) ? value : '-'}</RowText>
              </Tooltip>
            )}

            {i === 0 && (
              <RowBackground $height={containerHeight} $width={containerWidth} $top={containerHeight * index} $hovered={isHovered} $status={status} />
            )}
          </TableData>
        )
      })}
    </TableRow>
  )
}

export { Row, type RowProps }
