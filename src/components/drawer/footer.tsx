import React, { type FC } from 'react'
import { slide } from '../../styles'
import { FlexRow } from '../../styled'
import styled from 'styled-components'
import { useTransition } from '../../hooks'
import { Button, type ButtonProps } from '../button'

interface DrawerFooterProps {
  isOpen: boolean
  leftButtons?: (ButtonProps & { 'data-id': string })[]
  rightButtons?: (ButtonProps & { 'data-id': string })[]
}

const Container = styled.div<{ $isVisible: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 24px 18px 24px 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.translucent_bg};
  transform: translateY(100%);
`

const AlignLeft = styled(FlexRow)`
  margin-right: auto;
`

const AlignRight = styled(FlexRow)`
  margin-left: auto;
`

const FooterButton = styled(Button)`
  min-width: 140px;
  font-size: 14px;
`

const DrawerFooter: FC<DrawerFooterProps> = ({ isOpen, leftButtons = [], rightButtons = [] }) => {
  const Transition = useTransition({
    container: Container,
    animateIn: slide.in['bottom'],
    animateOut: slide.out['bottom'],
  })

  return (
    <Transition enter={isOpen}>
      <AlignLeft>
        {leftButtons.map((btn, i) => (
          <FooterButton key={`footer-left-button-${i}`} {...btn} />
        ))}
      </AlignLeft>

      <AlignRight>
        {rightButtons.map((btn, i) => (
          <FooterButton key={`footer-right-button-${i}`} {...btn} />
        ))}
      </AlignRight>
    </Transition>
  )
}

export { DrawerFooter, type DrawerFooterProps }
