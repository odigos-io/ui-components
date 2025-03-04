import React, { type FC, Fragment, type ReactNode, useEffect, useRef, useState } from 'react'
import { Text } from '../text'
import { Status } from '../status'
import { Tooltip } from '../tooltip'
import { Divider } from '../divider'
import Theme from '@odigos/ui-theme'
import { Checkbox } from '../checkbox'
import { IconGroup } from '../icon-group'
import { type SVG } from '@odigos/ui-icons'
import { IconButton } from '../icon-button'
import { IconWrapped } from '../icon-wrapped'
import { ExtendArrow } from '../extend-arrow'
import styled, { css } from 'styled-components'
import { MonitorsIcons } from '../monitors-icons'
import { FlexColumn, FlexRow } from '../../styled'
import { NOTIFICATION_TYPE, SIGNAL_TYPE } from '@odigos/ui-utils'

interface DataTabProps {
  title: string
  subTitle?: string
  icon?: SVG
  icons?: SVG[]
  iconSrc?: string
  iconSrcs?: string[]
  hoverText?: string
  status?: NOTIFICATION_TYPE
  faded?: boolean
  monitors?: SIGNAL_TYPE[]
  monitorsWithLabels?: boolean
  isActive?: boolean
  withCheckbox?: boolean
  isCheckboxDisabled?: boolean
  isChecked?: boolean
  onCheckboxChange?: (value: boolean) => void
  withExtend?: boolean
  isExtended?: boolean
  renderExtended?: () => ReactNode
  renderActions?: () => ReactNode
  onClick?: () => void
}

const ControlledVisibility = styled.div`
  visibility: hidden;
`

const Container = styled.div<{ $withClick: boolean; $status: DataTabProps['status']; $faded: DataTabProps['faded'] }>`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  padding: 16px;
  width: calc(100% - 32px);
  border-radius: 16px;
  background-color: ${({ $status, theme }) =>
    !!$status ? theme.text[$status] + Theme.opacity.hex['010'] : theme.colors.secondary + Theme.opacity.hex['005']};
  opacity: ${({ $faded }) => ($faded ? 0.5 : 1)};

  ${({ $withClick, $status, theme }) =>
    $withClick
      ? css`
          &:hover {
            cursor: pointer;
            background-color: ${!!$status ? theme.text[$status] + Theme.opacity.hex['020'] : theme.colors.secondary + Theme.opacity.hex['010']};
            ${ControlledVisibility} {
              visibility: visible;
            }
          }
        `
      : `
      &:hover {
        ${ControlledVisibility} {
          visibility: visible;
        }
      }
    `}
`

const Title = styled(Text)<{ $maxWidth: number }>`
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  &::after {
    // This is to prevent the browser "default tooltip" from appearing when the title is too long
    content: '';
    display: block;
  }
`

const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const SubTitle = styled(Text)`
  color: ${({ theme }) => theme.text.grey};
  font-size: 10px;
`

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`

const HoverText = styled(Text)`
  margin-right: 16px;
`

const DataTab: FC<DataTabProps> = ({
  title,
  subTitle,
  icon,
  icons,
  iconSrc,
  iconSrcs,
  hoverText,
  status,
  faded,
  monitors,
  monitorsWithLabels,
  isActive,
  withCheckbox,
  isCheckboxDisabled,
  isChecked,
  onCheckboxChange,
  withExtend,
  isExtended,
  renderExtended,
  renderActions,
  onClick,
  ...props
}) => {
  const [extend, setExtend] = useState(isExtended || false)
  const [maxWidth, setMaxWidth] = useState(0)
  const [isTitleOverflowed, setIsTitleOverflowed] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && actionsRef.current) {
      const containerWidth = containerRef.current.clientWidth
      const actionsWidth = actionsRef.current.clientWidth

      // 85 is the sum of the container-padding, icon width, and flex-row-gap
      // we round to 100, to consider cases with actions
      setMaxWidth(containerWidth - actionsWidth - 100)
    }
  }, [])

  useEffect(() => {
    const { current } = titleRef

    if (current) {
      const { clientWidth } = current
      const marginUp = maxWidth * 1.05 // add 5%
      const marginDown = maxWidth * 0.95 // subtract 5%

      setIsTitleOverflowed(clientWidth < marginUp && clientWidth > marginDown)
    }
  }, [title, maxWidth])

  const renderMonitors = (withSeperator: boolean) => {
    if (!monitors || !monitors.length) return null

    return (
      <>
        {withSeperator && <SubTitle>{'•'}</SubTitle>}
        <MonitorsIcons monitors={monitors} withLabels={monitorsWithLabels} size={10} />
      </>
    )
  }

  const renderActiveStatus = (withSeperator: boolean) => {
    if (typeof isActive !== 'boolean') return null

    return (
      <>
        {withSeperator && <SubTitle>{'•'}</SubTitle>}
        <Status status={isActive ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.ERROR} size={10} />
      </>
    )
  }

  return (
    <Container ref={containerRef} $status={status} $faded={faded} $withClick={!!onClick} onClick={onClick} {...props}>
      <FlexRow $gap={8}>
        <FlexRow $gap={16}>
          {withCheckbox && <Checkbox value={isChecked} onChange={onCheckboxChange} disabled={isCheckboxDisabled} />}

          {!!icons?.length || !!iconSrcs?.length ? (
            <IconGroup icons={icons} iconSrcs={iconSrcs} status={status} />
          ) : (
            <IconWrapped icon={icon} src={iconSrc} status={status} />
          )}
        </FlexRow>

        <FlexColumn $gap={4}>
          <Tooltip text={isTitleOverflowed ? title : undefined} withIcon={false}>
            <Title ref={titleRef} $maxWidth={maxWidth}>
              {title}
            </Title>
          </Tooltip>

          <SubTitleWrapper>
            {subTitle && <SubTitle>{subTitle}</SubTitle>}
            {renderMonitors(!!subTitle)}
            {renderActiveStatus(!!monitors?.length)}
          </SubTitleWrapper>
        </FlexColumn>

        <ActionsWrapper ref={actionsRef}>
          {!!hoverText && (
            <ControlledVisibility>
              <HoverText size={14} family='secondary'>
                {hoverText}
              </HoverText>
            </ControlledVisibility>
          )}
          {renderActions && renderActions()}
          {withExtend && (
            <Fragment>
              <Divider orientation='vertical' length='16px' margin='0 2px' />
              <IconButton onClick={() => setExtend((prev) => !prev)}>
                <ExtendArrow extend={extend} />
              </IconButton>
            </Fragment>
          )}
        </ActionsWrapper>
      </FlexRow>

      {extend && renderExtended && (
        <FlexColumn>
          <Divider margin='16px 0' />
          {renderExtended()}
        </FlexColumn>
      )}
    </Container>
  )
}

export { DataTab, type DataTabProps }
