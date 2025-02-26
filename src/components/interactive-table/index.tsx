import React, { type ReactNode, type FC, useState, CSSProperties } from 'react'
import { Text } from '../text'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { type SVG } from '@odigos/ui-icons'
import { IconWrapped } from '../icon-wrapped'
import { isEmpty, NOTIFICATION_TYPE } from '@odigos/ui-utils'

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
`

const TableBody = styled.tbody``

const TableRow = styled.tr<{ $withHover: boolean }>`
  line-height: 68px;
  cursor: ${({ $withHover }) => ($withHover ? 'pointer' : 'default')};
`

const TableData = styled.td<{ $isFirst: boolean }>`
  padding: 12px 8px 0 ${({ $isFirst }) => ($isFirst ? '16px' : '8px')};
  color: ${({ theme }) => theme.text.secondary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 14px;
  white-space: nowrap;
  width: fit-content;
`

const RowBackground = styled.div<{ $index: number; $hovered: boolean; $status?: NOTIFICATION_TYPE }>`
  position: absolute;
  top: ${({ $index }) => $index * 80 + 34}px;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 68px;
  margin: 12px 0;
  border-radius: 16px;
  background-color: ${({ theme, $hovered, $status }) =>
    $hovered
      ? !!$status
        ? theme.text[$status] + Theme.opacity.hex['030']
        : theme.colors.majestic_blue + Theme.opacity.hex['040']
      : (!!$status ? theme.colors[$status] : theme.colors.dropdown_bg_2) + Theme.opacity.hex['050']};
`

const InteractiveTable: FC<InteractiveTableProps> = ({ columns, rows, onRowClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1)

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
          {rows.map(({ cells }, i) => (
            <TableRow
              key={`row-${i}`}
              onMouseEnter={() => !!onRowClick && setHoveredIndex(i)}
              onMouseLeave={() => !!onRowClick && setHoveredIndex(-1)}
              onClick={() => !!onRowClick && onRowClick(i)}
              $withHover={!!onRowClick}
            >
              {columns.map(({ key }, ii) => {
                const rowCell = cells.find(({ columnKey }) => columnKey === key)
                if (!rowCell) return null
                const { value, textColor, icon, component: Component } = rowCell

                return (
                  <TableData key={`row-${i}-cell-${key}`} $isFirst={ii === 0}>
                    {!!icon ? (
                      <IconWrapped icon={icon} />
                    ) : !!Component ? (
                      <Component />
                    ) : (
                      <Text size={14} color={textColor}>
                        {!isEmpty(value) ? value : '-'}
                      </Text>
                    )}
                  </TableData>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {rows.map(({ status }, i) => (
        <RowBackground key={`bg-${i}`} $index={i} $hovered={hoveredIndex === i} $status={status} />
      ))}
    </Container>
  )
}

export { InteractiveTable, type InteractiveTableProps, type ColumnCell, type RowCell }
