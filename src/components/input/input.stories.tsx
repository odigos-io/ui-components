import React, { useEffect } from 'react'
import { Theme } from '../..'
import { Input, type InputProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends InputProps {
  darkMode: boolean
}

export default {
  title: 'Components/Input',
  component: Input,
}

// Create a master template for mapping props to render the Button component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <Input {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  title: 'Password',
  type: 'password',
}
