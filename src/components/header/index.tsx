import React, { type ReactNode } from 'react'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { FlexRow } from '../../styled'

interface HeaderProps {
  left?: ReactNode[]
  center?: ReactNode[]
  right?: ReactNode[]
}

const Container = styled(FlexRow)`
  position: relative;
  width: 100%;
  padding: 12px 0;
  background-color: ${({ theme }) => theme.colors.dark_grey};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border + Theme.opacity.hex['050']};
`

const AlignLeft = styled(FlexRow)`
  margin-right: auto;
  margin-left: 32px;
  gap: 12px;
`

const AlignRight = styled(FlexRow)`
  margin-left: auto;
  margin-right: 32px;
  gap: 12px;
`

const PositionCenter = styled(FlexRow)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  gap: 12px;
`

const Header: React.FC<HeaderProps> = ({ left = [], center = [], right = [] }) => {
  return (
    <Container>
      <AlignLeft>{left}</AlignLeft>
      <PositionCenter>{center}</PositionCenter>
      <AlignRight>{right}</AlignRight>
    </Container>
  )
}

export { Header, type HeaderProps }
