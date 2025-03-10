import React, { type ButtonHTMLAttributes, FC, useRef } from 'react'
import Theme from '@odigos/ui-theme'
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
    border: 1px solid ${({ theme }) => theme.text.secondary + Theme.opacity.hex['024']};
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      background: ${({ theme }) => theme.colors.secondary + Theme.opacity.hex['080']};
    }
    &:active {
      background: ${({ theme }) => theme.text.secondary + Theme.opacity.hex['060']};
    }
  `,
  secondary: css`
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    &:hover {
      border: 1px solid ${({ theme }) => theme.text.darker_grey};
      background: ${({ theme }) => theme.colors.primary + Theme.opacity.hex['080']};
    }
    &:active {
      border: 1px solid ${({ theme }) => theme.text.dark_grey};
      background: ${({ theme }) => theme.colors.primary + Theme.opacity.hex['060']};
    }
  `,
  tertiary: css`
    border-color: transparent;
    background: transparent;
    &:hover {
      background: ${({ theme }) => theme.colors.dropdown_bg_2 + Theme.opacity.hex['040']};
    }
    &:active {
      background: ${({ theme }) => theme.colors.dropdown_bg_2};
    }
  `,
  danger: css`
    border-color: transparent;
    background: ${({ theme }) => theme.text.error};
    &:hover {
      background: ${({ theme }) => theme.text.error + Theme.opacity.hex['090']};
    }
    &:active {
      background: ${({ theme }) => theme.text.error + Theme.opacity.hex['080']};
    }
  `,
  warning: css`
    border-color: transparent;
    background: ${({ theme }) => theme.text.warning};
    &:hover {
      background: ${({ theme }) => theme.text.warning + Theme.opacity.hex['090']};
    }
    &:active {
      background: ${({ theme }) => theme.text.warning + Theme.opacity.hex['080']};
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
            background: ${({ theme }) => theme.text.secondary + Theme.opacity.hex['010']};
            &:hover {
              background: ${({ theme }) => theme.text.secondary + Theme.opacity.hex['015']};
            }
          `
        : ''}
    `}
`

const Button: FC<ButtonProps> = ({ children, variant = 'primary', onClick, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null)

  return (
    <Container $variant={variant}>
      <StyledButton
        ref={ref}
        $variant={variant}
        onClick={(e) => {
          if (onClick) onClick(e)
          ref.current?.blur()
        }}
        {...props}
      >
        {children}
      </StyledButton>
    </Container>
  )
}

export { Button, type ButtonProps }
