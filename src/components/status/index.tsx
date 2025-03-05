import React, { type FC } from 'react'
import { Text } from '../text'
import { Divider } from '../divider'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { FadeLoader } from '../fade-loader'
import { getStatusIcon, NOTIFICATION_TYPE, OTHER_STATUS } from '@odigos/ui-utils'

interface StatusProps {
  title?: string
  subtitle?: string
  size?: number
  family?: 'primary' | 'secondary'
  status?: NOTIFICATION_TYPE | OTHER_STATUS.LOADING
  withIcon?: boolean
  withBorder?: boolean
  withBackground?: boolean
}

const Container = styled.div<{
  $size: number
  $status: NOTIFICATION_TYPE
  $withIcon?: StatusProps['withIcon']
  $withBorder?: StatusProps['withBorder']
  $withBackground?: StatusProps['withBackground']
}>`
  display: flex;
  align-items: center;
  gap: ${({ $size }) => $size / 3}px;
  padding: ${({ $size, $withBorder, $withBackground }) =>
    $withBorder || $withBackground ? `${$size / ($withBorder ? 3 : 2)}px ${$size / ($withBorder ? 1.5 : 1)}px` : '0'};
  width: fit-content;
  border-radius: 360px;
  border: ${({ $withBorder, $status, theme }) => ($withBorder ? `1px solid ${theme.text[$status] + Theme.opacity.hex['050']}` : 'none')};
  background: ${({ $withBackground, $status, theme }) =>
    $withBackground ? `linear-gradient(90deg, transparent 0%, ${theme.text[$status] + Theme.opacity.hex['030']} 100%)` : 'transparent'};
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Status: FC<StatusProps> = ({
  title,
  subtitle,
  size = 12,
  family = 'secondary',
  status = NOTIFICATION_TYPE.DEFAULT,
  withIcon,
  withBorder,
  withBackground,
}) => {
  const theme = Theme.useTheme()

  const statusType = status === OTHER_STATUS.LOADING ? NOTIFICATION_TYPE.INFO : status
  const StatusIcon = status === OTHER_STATUS.LOADING ? () => <FadeLoader scale={0.8} /> : () => getStatusIcon(statusType, theme)({ size: size + 2 })

  return (
    <Container $size={size} $status={statusType} $withIcon={withIcon} $withBorder={withBorder} $withBackground={withBackground}>
      {withIcon && (
        <IconWrapper>
          <StatusIcon />
        </IconWrapper>
      )}

      {(!!title || !!subtitle) && (
        <TextWrapper>
          {!!title && (
            <Text size={size} family={family} color={theme.text[statusType]}>
              {title}
            </Text>
          )}

          {!!title && !!subtitle && <Divider orientation='vertical' length={`${size - 2}px`} type={statusType} />}

          {!!subtitle && (
            <Text size={size - 2} family={family} color={theme.text[`${statusType}_secondary`]}>
              {subtitle}
            </Text>
          )}
        </TextWrapper>
      )}
    </Container>
  )
}

export { Status, type StatusProps }
