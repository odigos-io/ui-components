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
`

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
`

const TableHead = styled.thead`
  // only supported with "border-collapse: collapse;"
  // border-top: 1px solid ${({ theme }) => theme.colors.dropdown_bg_2};
  // border-bottom: 1px solid ${({ theme }) => theme.colors.dropdown_bg_2};
`

const TableTitle = styled.th`
  // only required with "border-collapse: separate;"
  border-top: 1px solid ${({ theme }) => theme.colors.dropdown_bg_2};
  border-bottom: 1px solid ${({ theme }) => theme.colors.dropdown_bg_2};

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
  cursor: ${({ $withHover }) => ($withHover ? 'pointer' : 'default')};
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

            {i === 0 && (
              <RowBackground $height={containerHeight} $width={containerWidth} $top={containerHeight * index} $hovered={isHovered} $status={status} />
            )}
          </TableData>
        )
      })}
    </TableRow>
  )
}

export { InteractiveTable, type InteractiveTableProps, type ColumnCell, type RowCell }
