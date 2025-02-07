import Theme from '@odigos/ui-theme'
import React, { type ReactNode, type FC } from 'react'
import styled from 'styled-components'

interface BadgeProps {
  label: string | number | ReactNode
  filled?: boolean
  onClick?: () => void
}

const Styled = styled.span<{ $filled: BadgeProps['filled']; $clickable: boolean }>`
  min-height: 16px;
  min-width: 16px;
  width: fit-content;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border: 1px solid ${({ theme, $filled }) => ($filled ? 'transparent' : theme.colors.border)};
  background-color: ${({ theme, $filled }) => ($filled ? theme.colors.majestic_blue : 'transparent')};
  color: ${({ theme, $filled }) => ($filled ? theme.text.white : theme.text.grey)};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-size: 12px;
  white-space: nowrap;
  ${({ theme, $filled, $clickable }) =>
    $clickable &&
    `&:hover {
      cursor: pointer;
      background-color: ${$filled ? theme.colors.majestic_blue_soft : theme.colors.secondary + Theme.opacity.hex['020']};
    }`}
`

const Badge: FC<BadgeProps> = ({ label, filled, onClick }) => {
  return (
    <Styled $filled={filled} $clickable={!!onClick} onClick={onClick}>
      {label}
    </Styled>
  )
}

export { Badge, type BadgeProps }
