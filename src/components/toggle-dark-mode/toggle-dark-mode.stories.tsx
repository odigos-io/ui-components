import React, { useState } from 'react'
import { type StoryFn } from '@storybook/react'
import { ToggleDarkMode, type ToggleDarkModeProps } from '.'

export default {
  title: 'Components/ToggleDarkMode',
  component: ToggleDarkMode,
}

export const Default: StoryFn<ToggleDarkModeProps> = (props) => {
  const [val, setVal] = useState(true)

  return <ToggleDarkMode {...props} darkMode={val} setDarkMode={setVal} />
}

Default.args = {}
