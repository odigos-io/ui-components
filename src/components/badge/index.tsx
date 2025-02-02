import React, { type ReactNode, type FC } from 'react'
import styled from 'styled-components'

interface BadgeProps {
  label: string | number | ReactNode
  filled?: boolean
}

const Styled = styled.span<{ $filled: BadgeProps['filled'] }>`
  min-width: 18px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border: 1px solid ${({ theme, $filled }) => ($filled ? theme.colors.majestic_blue : theme.colors.border)};
  background-color: ${({ theme, $filled }) => ($filled ? theme.colors.majestic_blue : 'transparent')};
  color: ${({ theme, $filled }) => ($filled ? theme.text.white : theme.text.grey)};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-size: 12px;
  white-space: nowrap;
`

const Badge: FC<BadgeProps> = ({ label, filled }) => {
  return <Styled $filled={filled}>{label}</Styled>
}

export { Badge, type BadgeProps }
