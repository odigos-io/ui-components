import React, { useState, useEffect, useRef, useMemo, type FC } from 'react'
import { Text } from '../text'
import { Input } from '../input'
import { Button } from '../button'
import styled from 'styled-components'
import { isEmpty } from '../../functions'
import { FieldLabel } from '../field-label'
import { FieldError } from '../field-error'
import { PlusIcon, TrashIcon } from '../../icons'

type Row = {
  [key: string]: any
}

interface InputTableProps {
  columns: {
    title: string
    keyName: string
    type?: 'number'
    placeholder?: string
    tooltip?: string
    required?: boolean
  }[]
  initialValues?: Row[]
  value?: Row[]
  onChange?: (values: Row[]) => void
  errorMessage?: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

const AddButton = styled(Button)`
  color: ${({ theme }) => theme.text.secondary};
  background: transparent;
  display: flex;
  gap: 8px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  align-self: flex-start;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: opacity 0.3s;
`

const ButtonText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  font-family: ${({ theme }) => theme.font_family.secondary};
  text-decoration-line: underline;
`

const InputTable: FC<InputTableProps> = ({ columns, initialValues = [], value, onChange, errorMessage }) => {
  // INITIAL_ROW as state, because it's dynamic to the "columns" prop
  const [initialRow, setInitialRow] = useState<Row>({})
  const [rows, setRows] = useState<Row[]>(value || initialValues)

  useEffect(() => {
    if (!rows.length) {
      const init: Row = {}
      columns.forEach(({ keyName }) => (init[keyName] = ''))
      setInitialRow(init)
      setRows([{ ...init }])
    }
  }, [])

  // Filter out rows where either key or value is empty
  const validRows = useMemo(() => rows.filter((row) => !Object.values(row).filter((val) => isEmpty(val)).length), [rows])
  const recordedRows = useRef(JSON.stringify(validRows))

  useEffect(() => {
    const stringified = JSON.stringify(validRows)

    // Only trigger onChange if valid key-value pairs have changed
    if (recordedRows.current !== stringified) {
      recordedRows.current = stringified

      if (onChange) onChange(validRows)
    }
  }, [validRows, onChange])

  const handleAddRow = () => {
    setRows((prev) => {
      const payload = [...prev]
      payload.push({ ...initialRow })
      return payload
    })
  }

  const handleDeleteRow = (idx: number) => {
    setRows((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleChange = (key: string, val: string | number, idx: number) => {
    setRows((prev) => {
      const payload = [...prev]
      payload[idx][key] = val
      return payload
    })
  }

  // Check if any key or value field is empty
  const isMinRows = rows.length <= 1
  const isAddButtonDisabled = rows.some((row) => !!Object.values(row).filter((val) => isEmpty(val)).length)
  const isDelButtonDisabled = isMinRows && isAddButtonDisabled

  // adjust cell-width based on the amount of inputs on-screen,
  // the "0.4" is to consider the delete button
  const maxWidth = `${Math.floor(640 / (columns.length + 0.4))}px`

  return (
    <Container>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map(({ title, tooltip, required }) => (
              <th key={`input-table-head-${title}`} style={{ maxWidth }}>
                <FieldLabel title={title} required={required} tooltip={tooltip} />
              </th>
            ))}

            <th>{/* this is here because of delete button */}</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr key={`input-table-row-${idx}`}>
              {columns.map(({ type, keyName, placeholder, required }, innerIdx) => {
                const value = row[keyName]

                return (
                  <td key={`input-table-${idx}-${keyName}`} style={{ maxWidth, padding: '4px 6px 4px 0' }}>
                    <Input
                      autoFocus={isEmpty(value) && !isMinRows && idx === rows.length - 1 && innerIdx === 0}
                      type={type}
                      placeholder={placeholder}
                      value={value}
                      onChange={({ target: { value: val } }) => handleChange(keyName, type === 'number' ? Number(val) : val, idx)}
                      style={{ maxWidth, paddingLeft: 10 }}
                      hasError={!!errorMessage && (!required || (required && isEmpty(value)))}
                    />
                  </td>
                )
              })}

              <td>
                <DeleteButton
                  disabled={isDelButtonDisabled}
                  onClick={() => {
                    if (isMinRows) {
                      columns.forEach(({ keyName }) => handleChange(keyName, '', idx))
                    } else {
                      handleDeleteRow(idx)
                    }
                  }}
                >
                  <TrashIcon />
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!!errorMessage && <FieldError>{errorMessage}</FieldError>}

      <AddButton disabled={isAddButtonDisabled} variant='tertiary' onClick={handleAddRow}>
        <PlusIcon />
        <ButtonText>ADD ENDPOINT FILTER</ButtonText>
      </AddButton>
    </Container>
  )
}

export { InputTable, type InputTableProps }
