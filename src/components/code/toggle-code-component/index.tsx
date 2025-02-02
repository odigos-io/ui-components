import React, { FC } from 'react'
import styled from 'styled-components'
import { FlexRow } from '../../../styled'
import { CodeIcon, ListIcon } from '../../../icons'

interface ToggleCodeComponentProps {
  isPrettyMode: boolean
  setIsPrettyMode: (isPrettyMode: boolean) => void
}

const Container = styled(FlexRow)`
  gap: 0;
`

const Button = styled.button<{ $position: 'left' | 'right'; $selected: boolean }>`
  padding: 4px 8px;
  background-color: ${({ theme, $selected }) => ($selected ? theme.colors.dropdown_bg_2 : 'transparent')};
  border-radius: ${({ $position }) => ($position === 'left' ? '32px 0px 0px 32px' : $position === 'right' ? '0px 32px 32px 0px' : '0')};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.secondary};
  }
`

const ToggleCodeComponent: FC<ToggleCodeComponentProps> = ({ isPrettyMode, setIsPrettyMode }) => {
  return (
    <Container>
      <Button $position='left' $selected={isPrettyMode} onClick={() => setIsPrettyMode(true)}>
        <ListIcon />
      </Button>
      <Button $position='right' $selected={!isPrettyMode} onClick={() => setIsPrettyMode(false)}>
        <CodeIcon />
      </Button>
    </Container>
  )
}

export { ToggleCodeComponent, type ToggleCodeComponentProps }
