import React, { type ReactNode, type FC } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Overlay } from '../../styled'
import { Theme } from '@odigos/ui-theme'
import { useKeyDown, useTransition } from '@odigos/ui-utils'
import { DrawerHeader, DrawerHeaderProps } from './drawer-header'
import { DrawerFooter, DrawerFooterProps } from './drawer-footer'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  closeOnEscape?: boolean
  position?: 'right' | 'left'
  width?: string
  children: ReactNode
  header: Omit<DrawerHeaderProps, 'onClose'>
  footer: DrawerFooterProps
}

const Container = styled.div<{
  $position: DrawerProps['position']
  $width: DrawerProps['width']
}>`
  position: fixed;
  top: 0;
  bottom: 0;
  ${({ $position }) => $position}: 0;
  z-index: 1000;
  width: ${({ $width }) => $width};
  background: ${({ theme }) => theme.colors.translucent_bg};
  box-shadow: 0 2px 10px ${({ theme }) => theme.colors.primary + Theme.hexPercent['010']};
  overflow-y: auto;
`

const DrawerBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Content = styled.div`
  flex-grow: 1;
  padding: 24px 32px;
  overflow-y: auto;
`

const Drawer: FC<DrawerProps> = ({
  isOpen,
  onClose,
  closeOnEscape = true,
  position = 'right',
  width = '300px',
  children,
  header: { icon, iconSrc, title, titleTooltip, replaceTitleWith, actionButtons },
  footer: { isOpen: footerIsOpen, leftButtons, rightButtons },
}) => {
  useKeyDown(
    {
      key: 'Escape',
      active: isOpen && closeOnEscape,
    },
    () => onClose()
  )

  const Transition = useTransition({
    container: Container,
    animateIn: Theme.slide.in[position],
    animateOut: Theme.slide.out[position],
  })

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <>
      <Overlay hidden={!isOpen} onClick={onClose} />

      <Transition data-id='drawer' enter={isOpen} $position={position} $width={width}>
        <DrawerBody>
          <DrawerHeader
            onClose={onClose}
            icon={icon}
            iconSrc={iconSrc}
            title={title}
            titleTooltip={titleTooltip}
            replaceTitleWith={replaceTitleWith}
            actionButtons={actionButtons}
          />
          <Content>{children}</Content>
          <DrawerFooter isOpen={footerIsOpen} leftButtons={leftButtons} rightButtons={rightButtons} />
        </DrawerBody>
      </Transition>
    </>,
    document.body
  )
}

export { Drawer, type DrawerProps, DrawerHeader, type DrawerHeaderProps, DrawerFooter, type DrawerFooterProps }
