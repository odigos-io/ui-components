import React, { type FC, type ReactNode } from 'react'
import { Text } from '../../text'
import styled from 'styled-components'
import { Tooltip } from '../../tooltip'
import { FlexRow } from '../../../styled'
import { IconWrapped } from '../../icon-wrapped'
import { XIcon, type SVG } from '@odigos/ui-icons'
import { Button, type ButtonProps } from '../../button'

interface DrawerHeaderProps {
  onClose: () => void
  icon?: SVG
  iconSrc?: string
  title?: string
  titleTooltip?: string
  replaceTitleWith?: () => ReactNode
  actionButtons?: (ButtonProps & { 'data-id': string })[]
  tabs?: {
    label: string
    icon?: SVG
    onClick: () => void
    selected?: boolean
  }[]
}

const Container = styled.section`
  padding: 0px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const TopRow = styled.div`
  height: 76px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  align-self: stretch;
`

const BottomRow = styled(FlexRow)``

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

const Tab = styled(Text)<{ $selected?: boolean }>`
  padding: 12px;
  font-size: 14px;
  color: ${({ theme, $selected }) => ($selected ? theme.text.secondary : theme.text.grey)};
  border-bottom: 2px solid ${({ theme, $selected }) => ($selected ? theme.colors.majestic_blue : 'transparent')};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`

const DrawerHeader: FC<DrawerHeaderProps> = ({
  onClose,
  icon,
  iconSrc,
  title,
  titleTooltip,
  replaceTitleWith: ReplaceTitleWith,
  actionButtons = [],
  tabs,
}) => {
  return (
    <Container>
      <TopRow>
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
      </TopRow>

      {!!tabs?.length && (
        <BottomRow>
          {tabs.map(({ label, icon: Icon, onClick, selected }) => (
            <Tab key={`drawer-header-tab-${label}`} onClick={onClick} $selected={selected}>
              {label}
              {Icon && <Icon />}
            </Tab>
          ))}
        </BottomRow>
      )}
    </Container>
  )
}

export { DrawerHeader, type DrawerHeaderProps }
