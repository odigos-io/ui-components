import React, { type FC, useEffect, useRef, useState } from 'react'
import { Checkbox } from '../checkbox'
import { FieldLabel } from '../field-label'
import { FieldError } from '../field-error'
import { css, styled } from '@odigos/ui-theme'
import { MONITORS_OPTIONS, SIGNAL_TYPE } from '@odigos/ui-utils'

interface MonitorsCheckboxesProps {
  isVertical?: boolean
  title?: string
  required?: boolean
  errorMessage?: string
  allowedSignals?: SIGNAL_TYPE[]
  selectedSignals: SIGNAL_TYPE[]
  setSelectedSignals: (value: SIGNAL_TYPE[]) => void
}

const ListContainer = styled.div<{ $isVertical?: MonitorsCheckboxesProps['isVertical']; $hasError: boolean }>`
  display: flex;
  flex-direction: ${({ $isVertical }) => ($isVertical ? 'column' : 'row')};
  gap: ${({ $isVertical }) => ($isVertical ? '12px' : '24px')};
  ${({ $hasError }) =>
    $hasError &&
    css`
      border: 1px solid ${({ theme }) => theme.text.error};
      border-radius: 32px;
      padding: 8px;
    `}
`

const isAllowed = (type: SIGNAL_TYPE, allowedSignals: MonitorsCheckboxesProps['allowedSignals']) => {
  return !allowedSignals?.length || !!allowedSignals?.find((str) => str === type)
}

const isSelected = (type: SIGNAL_TYPE, selectedSignals: MonitorsCheckboxesProps['selectedSignals']) => {
  return !!selectedSignals?.find((str) => str === type)
}

const MonitorsCheckboxes: FC<MonitorsCheckboxesProps> = ({
  isVertical,
  title = 'Monitors',
  required,
  errorMessage,
  allowedSignals,
  selectedSignals,
  setSelectedSignals,
}) => {
  const [isLastSelection, setIsLastSelection] = useState(selectedSignals.length === 1)
  const recordedRows = useRef(JSON.stringify(selectedSignals))

  useEffect(() => {
    const payload: SIGNAL_TYPE[] = selectedSignals

    if (!payload.length) {
      MONITORS_OPTIONS.forEach(({ id }) => {
        if (isAllowed(id, allowedSignals)) payload.push(id)
      })
    }

    const stringified = JSON.stringify(payload)

    if (recordedRows.current !== stringified) {
      recordedRows.current = stringified
      setSelectedSignals(payload)
      setIsLastSelection(payload.length === 1)
    }

    return () => {
      recordedRows.current = ''
    }
    // eslint-disable-next-line
  }, [allowedSignals])

  const handleChange = (key: SIGNAL_TYPE, isAdd: boolean) => {
    const keyUpper = key
    const payload = isAdd ? [...selectedSignals, keyUpper] : selectedSignals.filter((str) => str !== keyUpper)

    setSelectedSignals(payload)
    setIsLastSelection(payload.length === 1)
  }

  return (
    <div>
      {title && <FieldLabel title={title} required={required} />}

      <ListContainer $isVertical={isVertical} $hasError={!!errorMessage}>
        {MONITORS_OPTIONS.map((monitor) => {
          const allowed = isAllowed(monitor.id, allowedSignals)
          const selected = isSelected(monitor.id, selectedSignals)

          if (!allowed) return null

          return (
            <Checkbox
              key={monitor.id}
              title={monitor.value}
              disabled={!allowed || (isLastSelection && selected)}
              value={selected}
              onChange={(value) => handleChange(monitor.id, value)}
            />
          )
        })}
      </ListContainer>

      {!!errorMessage && <FieldError>{errorMessage}</FieldError>}
    </div>
  )
}

export { MonitorsCheckboxes, type MonitorsCheckboxesProps }
