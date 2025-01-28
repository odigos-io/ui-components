import React, { type ButtonHTMLAttributes, forwardRef } from 'react'
import { hexPercent } from '../../styles'
import styled, { css } from 'styled-components'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning'
}

const Container = styled.div<{ $variant: ButtonProps['variant'] }>`
  height: fit-content;
  border: 2px solid transparent;
  padding: 2px;
  border-radius: 32px;
  background-color: transparent;
  transition: border-color 0.3s ease;
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`

const variantStyles = {
  primary: css`
    border: 1px solid ${({ theme }) => theme.text.secondary + hexPercent['024']};
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      background: ${({ theme }) => theme.colors.secondary + hexPercent['080']};
    }
    &:active {
      background: ${({ theme }) => theme.text.secondary + hexPercent['060']};
    }
  `,
  secondary: css`
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    &:hover {
      border: 1px solid ${({ theme }) => theme.text.darker_grey};
      background: ${({ theme }) => theme.colors.primary + hexPercent['080']};
    }
    &:active {
      border: 1px solid ${({ theme }) => theme.text.dark_grey};
      background: ${({ theme }) => theme.colors.primary + hexPercent['060']};
    }
  `,
  tertiary: css`
    border-color: transparent;
    background: transparent;
    &:hover {
      background: ${({ theme }) => theme.colors.dropdown_bg_2 + hexPercent['040']};
    }
    &:active {
      background: ${({ theme }) => theme.colors.dropdown_bg_2};
    }
  `,
  danger: css`
    border-color: transparent;
    background: ${({ theme }) => theme.text.error};
    &:hover {
      background: ${({ theme }) => theme.text.error + hexPercent['090']};
    }
    &:active {
      background: ${({ theme }) => theme.text.error + hexPercent['080']};
    }
  `,
  warning: css`
    border-color: transparent;
    background: ${({ theme }) => theme.text.warning};
    &:hover {
      background: ${({ theme }) => theme.text.warning + hexPercent['090']};
    }
    &:active {
      background: ${({ theme }) => theme.text.warning + hexPercent['080']};
    }
  `,
}

const StyledButton = styled.button<{ $variant: ButtonProps['variant'] }>`
  height: 36px;
  border-radius: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 12px;
  font-family: ${({ theme }) => theme.font_family.secondary};
  text-transform: uppercase;
  text-decoration: underline;
  font-weight: 600;
  outline: none;
  ${({ $variant }) => $variant && variantStyles[$variant]}
  ${({ disabled, $variant }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;

      ${$variant === 'primary'
        ? css`
            color: ${({ theme }) => theme.colors.secondary};
            background: ${({ theme }) => theme.text.secondary + hexPercent['010']};
            &:hover {
              background: ${({ theme }) => theme.text.secondary + hexPercent['015']};
            }
          `
        : ''}
    `}
`

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, variant = 'primary', ...props }, ref) => {
  return (
    <Container $variant={variant}>
      <StyledButton ref={ref} $variant={variant} {...props}>
        {children}
      </StyledButton>
    </Container>
  )
})

export { Button, type ButtonProps }
