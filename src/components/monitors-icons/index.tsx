import React from 'react'
import { Text } from '../text'
import { Tooltip } from '../tooltip'
import { FlexRow } from '../../styled'
import { SIGNAL_TYPE } from '../../@types'
import { useTheme } from 'styled-components'
import { getMonitorIcon } from '../../functions'
import { MONITORS_OPTIONS } from '../../constants'

interface MonitorsIconsProps {
  monitors?: SIGNAL_TYPE[]
  withTooltips?: boolean
  withLabels?: boolean
  size?: number
  color?: string
}

const defaultMonitors = MONITORS_OPTIONS.map(({ id }) => id) as SIGNAL_TYPE[]

const MonitorsIcons: React.FC<MonitorsIconsProps> = ({ monitors = defaultMonitors, withTooltips, withLabels, size = 12, color: clr }) => {
  const theme = useTheme()
  const color = clr || theme.text.grey

  return (
    <FlexRow $gap={withLabels ? size : size / 2}>
      {monitors
        .filter((str) => !!str)
        .map((signal) => {
          const displayName = signal.charAt(0).toUpperCase() + signal.slice(1)
          const Icon = getMonitorIcon(signal)

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
