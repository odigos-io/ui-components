import React, { type ReactNode, type FC, useState, CSSProperties, useId, useMemo } from 'react'
import { Text } from '../text'
import { Tooltip } from '../tooltip'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { FlexRow } from '../../styled'
import { IconWrapped } from '../icon-wrapped'
import { SortArrowsIcon, type SVG } from '@odigos/ui-icons'
import { isEmpty, NOTIFICATION_TYPE, useContainerSize } from '@odigos/ui-utils'

interface ColumnCell {
  key: string // used to bind the row cell to the column
  title: string
  sortable?: boolean
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
    faded?: boolean
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
`

const SortClickable = styled(FlexRow)`
  cursor: pointer;
  &:hover {
    * {
      color: ${({ theme }) => theme.text.secondary};
    }
  }
`

const Title = styled(Text)<{ $isSorted?: boolean }>`
  color: ${({ theme, $isSorted }) => ($isSorted ? theme.text.grey : theme.text.darker_grey)};
  font-family: ${({ theme }) => theme.font_family.secondary};
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  text-wrap: nowrap;
`

const TableBody = styled.tbody``

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

enum SORT_DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
}

const InteractiveTable: FC<InteractiveTableProps> = ({ columns, rows, onRowClick }) => {
  const [sortDirection, setSortDirection] = useState<SORT_DIRECTION>(SORT_DIRECTION.ASC)
  const [sortBy, setSortBy] = useState<string>(
    (() => {
      const lsVal = localStorage.getItem('odigos-sort-by')

      if (!!lsVal) {
        const found = columns.find(({ key }) => key === lsVal)
        if (!!found) return lsVal
      }

      return 'name'
    })()
  )

  const onSort = (key: string) => {
    if (sortBy === key) {
      setSortDirection((prev) => (prev === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC))
    } else {
      setSortBy(key)
      setSortDirection(SORT_DIRECTION.ASC)
      localStorage.setItem('odigos-sort-by', key)
    }
  }

  const sorted = useMemo(() => {
    const getCellValue = (row: InteractiveTableProps['rows'][0], key: string) => {
      return row.cells.find(({ columnKey }) => columnKey === key)?.value ?? null
    }

    const compareValues = (a: unknown, b: unknown) => {
      if (typeof a === 'number' && typeof b === 'number') return a - b
      if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b)
      if (typeof a === 'boolean' && typeof b === 'boolean') return a === b ? 0 : a ? 1 : -1

      // Fallback (handles null, undefined, mixed types)
      return String(a).localeCompare(String(b))
    }

    return !!sortBy
      ? rows.sort((a, b) => {
          const valueA = getCellValue(a, sortBy)
          const valueB = getCellValue(b, sortBy)

          const direction = sortDirection === SORT_DIRECTION.ASC ? 1 : -1

          return direction * compareValues(valueA, valueB)
        })
      : rows
  }, [rows, sortBy, sortDirection])

  return (
    <Container>
      <Table>
        <TableHead>
          <tr>
            {columns.map(({ key, title, sortable }) => (
              <TableTitle key={`column-${key}`}>
                {sortable ? (
                  <SortClickable onClick={() => onSort(key)}>
                    <SortArrowsIcon />
                    <Title $isSorted>{title}</Title>
                  </SortClickable>
                ) : (
                  <Title>{title}</Title>
                )}
              </TableTitle>
            ))}
          </tr>
        </TableHead>

        <TableBody>
          {sorted.map(({ status, faded, cells }, i) => (
            <Row
              key={`row-${i}`}
              index={i}
              columns={columns}
              cells={cells}
              onClick={!!onRowClick ? () => onRowClick(i) : undefined}
              status={status}
              faded={faded}
            />
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}

interface RowProps {
  index: number
  columns: ColumnCell[]
  cells: RowCell[]
  onClick?: () => void
  status?: NOTIFICATION_TYPE
  faded?: boolean
}

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
