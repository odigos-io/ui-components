import React, { type FC } from 'react'
import { Text } from '../text'
import Theme from '@odigos/ui-theme'
import { Tooltip } from '../tooltip'
import { FlexRow } from '../../styled'
import { capitalizeFirstLetter, getMonitorIcon, MONITORS_OPTIONS, SIGNAL_TYPE } from '@odigos/ui-utils'

interface MonitorsIconsProps {
  monitors?: SIGNAL_TYPE[]
  withTooltips?: boolean
  withLabels?: boolean
  size?: number
  color?: string
}

const defaultMonitors = MONITORS_OPTIONS.map(({ id }) => id) as SIGNAL_TYPE[]

const MonitorsIcons: FC<MonitorsIconsProps> = ({ monitors = defaultMonitors, withTooltips, withLabels, size = 12, color: clr }) => {
  const theme = Theme.useTheme()
  const color = clr || theme.text.grey

  return (
    <FlexRow $gap={withLabels ? size : size / 2}>
      {monitors
        .filter((str) => !!str)
        .map((str) => {
          const signal = str.toLowerCase() as SIGNAL_TYPE
          const displayName = capitalizeFirstLetter(signal)
          const Icon = getMonitorIcon(signal)

          if (!Icon) return null

          return (
            <Tooltip key={signal} text={withTooltips ? displayName : ''}>
              <FlexRow $gap={size / 3}>
                <Icon size={withLabels ? size + 2 : size} fill={color} />

                {withLabels && (
                  <Text size={size} color={color}>
                    {displayName}
                  </Text>
                )}
              </FlexRow>
            </Tooltip>
          )
        })}
    </FlexRow>
  )
}

export { MonitorsIcons, type MonitorsIconsProps }
