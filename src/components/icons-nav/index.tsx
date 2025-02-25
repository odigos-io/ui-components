import React, { type FC } from 'react'
import { Divider } from '../divider'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { type SVG } from '@odigos/ui-icons'

interface NavIcon {
  id: string
  icon: SVG | FC
  selected: boolean
  onClick: () => void
}

interface IconsNavProps {
  orientation?: 'horizontal' | 'vertical'
  flip?: boolean
  mainIcons: NavIcon[]
  subIcons: NavIcon[]
}

const Container = styled.div<{ $orientation: IconsNavProps['orientation']; $flip: IconsNavProps['flip'] }>`
  width: fit-content;
  height: fit-content;
  padding: 4px;
  gap: 4px;
  border-radius: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border + Theme.opacity.hex['070']};

  display: flex;
  flex-direction: ${({ $orientation, $flip }) => ($orientation === 'horizontal' ? 'row' : 'column') + ($flip ? '-reverse' : '')};
  align-items: center;
  justify-content: center;
`

const IconWrap = styled.div<{ $selected: NavIcon['selected'] }>`
  width: 28px;
  height: 28px;

  border-radius: 100%;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.majestic_blue + Theme.opacity.hex['070'] : theme.colors.secondary + Theme.opacity.hex['012']};
  transition: background-color 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`

const IconsNav: FC<IconsNavProps> = ({ orientation = 'vertical', flip, mainIcons, subIcons }) => {
  return (
    <Container $orientation={orientation} $flip={flip}>
      {mainIcons.map(({ icon: Icon, selected, onClick }, idx) => (
        <IconWrap key={`main-nav-icon-${idx}`} $selected={selected}>
          <Icon onClick={onClick} />
        </IconWrap>
      ))}

      {!!mainIcons.length && !!subIcons.length && (
        <Divider orientation={orientation === 'vertical' ? 'horizontal' : 'vertical'} margin='0' length='20px' />
      )}

      {subIcons.map(({ icon: Icon, selected, onClick }, idx) => (
        <IconWrap key={`sub-nav-icon-${idx}`} $selected={selected}>
          <Icon onClick={onClick} />
        </IconWrap>
      ))}
    </Container>
  )
}

export { IconsNav, type IconsNavProps, type NavIcon }
