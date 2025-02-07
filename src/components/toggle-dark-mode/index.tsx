import React, { type FC } from 'react'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { FlexRow } from '../../styled'
import { MoonIcon, SunIcon } from '@odigos/ui-icons'

interface ToggleDarkModeProps {}

const Container = styled(FlexRow)`
  position: relative;

  width: fit-content;
  padding: 6px;
  gap: 6px;
  border-radius: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  & > svg {
    cursor: pointer;
    z-index: 1;
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.secondary};
  }
`

const Background = styled.div<{ $darkMode: boolean }>`
  position: absolute;
  top: 2px;
  left: ${({ $darkMode }) => ($darkMode ? '2px' : 'calc(100% - 2px - 24px)')};
  z-index: 0;
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 100%;
  transition: all 0.3s;
`

const ToggleDarkMode: FC<ToggleDarkModeProps> = () => {
  const { darkMode, setDarkMode } = Theme.useDarkMode()

  return (
    <Container onClick={() => setDarkMode(!darkMode)}>
      <MoonIcon />
      <SunIcon />
      <Background $darkMode={darkMode} />
    </Container>
  )
}

export { ToggleDarkMode, type ToggleDarkModeProps }
