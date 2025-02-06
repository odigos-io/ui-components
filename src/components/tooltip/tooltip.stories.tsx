import React from 'react'
import { Tooltip, type TooltipProps } from '.'
import { type StoryFn } from '@storybook/react'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
}

export const Default: StoryFn<TooltipProps> = (props) => {
  return <Tooltip {...props} />
}

Default.args = {
  text: 'Hello World',
  withIcon: true,
}
