import React from 'react'
import { type StoryFn } from '@storybook/react'
import { MonitorsIcons, type MonitorsIconsProps } from '.'

export default {
  title: 'Components/MonitorsIcons',
  component: MonitorsIcons,
}

export const Default: StoryFn<MonitorsIconsProps> = (props) => {
  return <MonitorsIcons {...props} />
}

Default.args = {
  withLabels: true,
  withTooltips: false,
  size: 24,
}
