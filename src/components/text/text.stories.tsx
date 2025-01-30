import React, { useEffect } from 'react'
import { Theme } from '../..'
import { Text, type TextProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends TextProps {
  darkMode: boolean
}

export default {
  title: 'Components/Text',
  component: Text,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <Text {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  children: 'Hello World',
}
