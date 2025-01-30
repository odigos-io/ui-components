import React, { useEffect, useState } from 'react'
import { Theme } from '../..'
import { ToggleDarkMode, type ToggleDarkModeProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends ToggleDarkModeProps {
  darkMode: boolean
}

export default {
  title: 'Components/ToggleDarkMode',
  component: ToggleDarkMode,
}

// Create a master template for mapping props to render the Button component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  const [val, setVal] = useState(true)

  return (
    <Theme.Provider darkMode={darkMode}>
      <ToggleDarkMode {...props} darkMode={val} setDarkMode={setVal} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
}
