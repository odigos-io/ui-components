import React from 'react'
import { type StoryFn } from '@storybook/react'
import { ToggleDarkMode, type ToggleDarkModeProps } from '.'

export default {
  title: 'Components/ToggleDarkMode',
  component: ToggleDarkMode,
}

export const Default: StoryFn<ToggleDarkModeProps> = (props) => {
  return <ToggleDarkMode {...props} />
}

Default.args = {}
