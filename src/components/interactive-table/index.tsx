import React, { type ReactNode, type FC, useState, CSSProperties, useId } from 'react'
import { Text } from '../text'
import { Tooltip } from '../tooltip'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { type SVG } from '@odigos/ui-icons'
import { IconWrapped } from '../icon-wrapped'
import { isEmpty, NOTIFICATION_TYPE, useContainerSize } from '@odigos/ui-utils'

interface ColumnCell {
  key: string // used to bind the row cell to the column
  title: string
}

interface RowCell {
  columnKey: string // used to bind the row cell to the column
  icon?: SVG
  component?: () => ReactNode
  value?: string | number | boolean
  textColor?: CSSProperties['color']
  withTooltip?: boolean
}

interface InteractiveTableProps {
  columns: ColumnCell[]
  rows: {
    status?: NOTIFICATION_TYPE
    cells: RowCell[]
  }[]
  onRowClick?: (index: number) => void
}

const Container = styled.div`
  width: 100%;
  position: relative;
  z-index: 0;
`

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`

const TableHead = styled.thead`
  border-top: 1px solid ${({ theme }) => theme.colors.dropdown_bg_2};
  border-bottom: 1px solid ${({ theme }) => theme.colors.dropdown_bg_2};
`

const TableTitle = styled.th`
  padding: 8px;
  color: ${({ theme }) => theme.text.darker_grey};
  font-family: ${({ theme }) => theme.font_family.secondary};
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  text-wrap: nowrap;
`

const TableBody = styled.tbody``

const TableRow = styled.tr<{ $withHover: boolean }>`
  // line-height: 68px;
  cursor: ${({ $withHover }) => ($withHover ? 'pointer' : 'default')};
`

const TableData = styled.td<{ $isFirst: boolean }>`
  padding: 12px 8px 12px ${({ $isFirst }) => ($isFirst ? '16px' : '8px')};
  color: ${({ theme }) => theme.text.secondary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 14px;
  white-space: nowrap;
  width: fit-content;
`

const RowBackground = styled.div<{ $height: number; $top: number; $hovered: boolean; $status?: NOTIFICATION_TYPE }>`
  position: absolute;
  top: ${({ $top }) => $top + 38}px;
  left: 0;
  z-index: -1;
  width: 100%;
  height: ${({ $height }) => $height - 6}px;
  border-radius: 16px;
  background-color: ${({ theme, $hovered, $status }) =>
    $hovered
      ? theme.colors.majestic_blue + Theme.opacity.hex['010']
      : (!!$status ? theme.colors[$status] : theme.colors.dropdown_bg_2) + Theme.opacity.hex['020']};
`

const InteractiveTable: FC<InteractiveTableProps> = ({ columns, rows, onRowClick }) => {
  return (
    <Container>
      <Table>
        <TableHead>
          <tr>
            {columns.map(({ key, title }) => (
              <TableTitle key={`column-${key}`}>{title}</TableTitle>
            ))}
          </tr>
        </TableHead>

        <TableBody>
          {rows.map(({ status, cells }, i) => (
            <Row
              key={`row-${i}`}
              index={i}
              columns={columns}
              cells={cells}
              onClick={!!onRowClick ? () => onRowClick(i) : undefined}
              status={status}
            />
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}

const Row: FC<{ index: number; columns: ColumnCell[]; cells: RowCell[]; onClick?: () => void; status?: NOTIFICATION_TYPE }> = ({
  index,
  columns,
  cells,
  onClick,
  status,
}) => {
  const { containerRef, containerHeight } = useContainerSize()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <TableRow
      // @ts-ignore
      ref={containerRef}
      onMouseEnter={() => !!onClick && setIsHovered(true)}
      onMouseLeave={() => !!onClick && setIsHovered(false)}
      onClick={() => !!onClick && onClick()}
      $withHover={!!onClick}
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
                <Text
                  size={14}
                  color={textColor}
                  style={{
                    lineHeight: '16px',
                    textWrap: 'wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {!isEmpty(value) ? value : '-'}
                </Text>
              </Tooltip>
            )}

            <RowBackground $height={containerHeight} $top={containerHeight * index} $hovered={isHovered} $status={status} />
          </TableData>
        )
      })}
    </TableRow>
  )
}

export { InteractiveTable, type InteractiveTableProps, type ColumnCell, type RowCell }
