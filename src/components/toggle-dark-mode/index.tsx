import React, { type FC, useEffect } from 'react'
import styled from 'styled-components'
import { FlexRow } from '../../styled'
import { MoonIcon, SunIcon } from '@odigos/ui-icons'

interface ToggleDarkModeProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

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

const ToggleDarkMode: FC<ToggleDarkModeProps> = ({ darkMode, setDarkMode }) => {
  useEffect(() => {
    const lsValue = localStorage.getItem('darkMode')
    if (!!lsValue) setDarkMode(lsValue == 'true')
  }, [])

  const handleToggle = (bool?: boolean) => {
    const val = typeof bool === 'boolean' ? bool : !darkMode
    setDarkMode(val)
    localStorage.setItem('darkMode', JSON.stringify(val))
  }

  return (
    <Container onClick={() => handleToggle()}>
      <MoonIcon />
      <SunIcon />
      <Background $darkMode={darkMode} />
    </Container>
  )
}

export { ToggleDarkMode, type ToggleDarkModeProps }
