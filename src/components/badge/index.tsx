import React, { forwardRef } from 'react'
import styled from 'styled-components'

interface BadgeProps {
  label: string | number | React.ReactNode
  filled?: boolean
}

const Styled = styled.span<{ $filled: BadgeProps['filled'] }>`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid ${({ theme, $filled }) => ($filled ? theme.colors.majestic_blue : theme.colors.border)};
  background-color: ${({ theme, $filled }) => ($filled ? theme.colors.majestic_blue : 'transparent')};
  color: ${({ theme, $filled }) => ($filled ? theme.text.white : theme.text.grey)};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-size: 12px;
  white-space: nowrap;
`

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ label, filled }, ref = null) => {
  return (
    <Styled ref={ref} $filled={filled}>
      {label}
    </Styled>
  )
})

export { Badge, type BadgeProps }
