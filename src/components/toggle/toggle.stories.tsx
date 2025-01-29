import React, { useEffect, useState } from 'react'
import { Theme } from '../..'
import { Toggle, type ToggleProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends ToggleProps {
  darkMode: boolean
}

export default {
  title: 'Components/Toggle',
  component: Toggle,
}

// Create a master template for mapping props to render the Button component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  const [val, setVal] = useState(false)

  return (
    <Theme.Provider darkMode={darkMode}>
      <Toggle {...props} initialValue={val} onChange={setVal} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  title: 'Deploy on Friday',
  tooltip: 'We don’t recommend deploying on Fridays',
}
