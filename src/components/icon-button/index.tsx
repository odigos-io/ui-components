import React, { type CSSProperties, type FC, type PropsWithChildren } from 'react'
import { ping } from '../../styles'
import { Tooltip } from '../tooltip'
import styled from 'styled-components'

interface IconButtonProps extends PropsWithChildren {
  onClick?: () => void
  tooltip?: string
  size?: number
  withPing?: boolean
  pingColor?: CSSProperties['backgroundColor']
}

const Button = styled.button<{ $size: number }>`
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: none;
  border-radius: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.dropdown_bg_2};
  }
`

const Ping = styled.div<{ $size: number; $color: IconButtonProps['pingColor'] }>`
  position: absolute;
  top: ${({ $size }) => $size / 5}px;
  right: ${({ $size }) => $size / 5}px;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: ${({ theme, $color }) => $color || theme.colors.secondary};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 100%;
    background-color: ${({ theme, $color }) => $color || theme.colors.secondary};
    animation: ${ping} 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
`

const IconButton: FC<IconButtonProps> = ({ children, onClick, tooltip, size = 36, withPing, pingColor, ...props }) => {
  return (
    <Tooltip text={tooltip}>
      <Button $size={size} onClick={onClick} {...props}>
        {withPing && <Ping $size={size} $color={pingColor} />}
        {children}
      </Button>
    </Tooltip>
  )
}

export { IconButton, type IconButtonProps }
