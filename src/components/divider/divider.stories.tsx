import React, { useEffect } from 'react'
import { Theme } from '../..'
import { Divider, type DividerProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends DividerProps {
  darkMode: boolean
}

export default {
  title: 'Components/Divider',
  component: Divider,
}

// Create a master template for mapping props to render the Button component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <Divider {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  orientation: 'horizontal',
  thickness: 1,
  length: '100%',
}
