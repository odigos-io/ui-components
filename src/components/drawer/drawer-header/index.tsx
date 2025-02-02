import React, { type FC, type ReactNode } from 'react'
import { Text } from '../../text'
import { SVG } from '../../../@types'
import { XIcon } from '../../../icons'
import { Tooltip } from '../../tooltip'
import styled from 'styled-components'
import { IconWrapped } from '../../icon-wrapped'
import { Button, type ButtonProps } from '../../button'

interface DrawerHeaderProps {
  onClose: () => void
  icon?: SVG
  iconSrc?: string
  title?: string
  titleTooltip?: string
  replaceTitleWith?: () => ReactNode
  actionButtons?: (ButtonProps & { 'data-id': string })[]
}

const Container = styled.section`
  display: flex;
  height: 76px;
  padding: 0px 32px;
  justify-content: space-between;
  flex-shrink: 0;
  align-self: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const SectionItemsWrapper = styled.div<{ $gap?: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap || 16}px;
`

const Title = styled(Text)`
  font-size: 18px;
  line-height: 26px;
  max-width: 270px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const ActionButton = styled(Button)`
  gap: 8px;
`

const CloseButton = styled(Button)``

const DrawerHeader: FC<DrawerHeaderProps> = ({
  icon,
  iconSrc,
  title,
  titleTooltip,
  replaceTitleWith: ReplaceTitleWith,
  actionButtons = [],
  onClose,
}) => {
  return (
    <Container>
      <SectionItemsWrapper>
        {(!!icon || !!iconSrc) && <IconWrapped icon={icon} src={iconSrc} alt='Drawer Item' />}

        {!!ReplaceTitleWith ? (
          <ReplaceTitleWith />
        ) : (
          <Tooltip text={titleTooltip} withIcon>
            {title && <Title>{title}</Title>}
          </Tooltip>
        )}
      </SectionItemsWrapper>

      <SectionItemsWrapper $gap={2}>
        {actionButtons.map((btn, i) => (
          <ActionButton key={`header-action-button-${i}`} {...btn} />
        ))}

        <CloseButton data-id='drawer-close' variant='secondary' onClick={onClose}>
          <XIcon size={12} />
        </CloseButton>
      </SectionItemsWrapper>
    </Container>
  )
}

export { DrawerHeader, type DrawerHeaderProps }
