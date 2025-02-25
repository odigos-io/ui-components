import React from 'react'
import { Tooltip, type TooltipProps } from '.'
import { type StoryFn } from '@storybook/react'
import { WarningTriangleIcon } from '@odigos/ui-icons'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
}

export const Default: StoryFn<TooltipProps> = (props) => {
  return <Tooltip {...props} />
}

Default.args = {
  withIcon: true,
  titleIcon: WarningTriangleIcon,
  title: 'Failed to enable agent',
  text: 'Unsupported programming language',
  timestamp: new Date(),
}
