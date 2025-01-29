import React, { useEffect } from 'react'
import { Theme } from '../..'
import { Drawer, type DrawerProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { Text } from '../text'

interface Props extends DrawerProps {
  darkMode: boolean
}

export default {
  title: 'Components/Drawer',
  component: Drawer,
}

// Create a master template for mapping props to render the Button component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <Drawer {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  isOpen: true,
  onClose: () => {},
  children: <Text>Drawer content</Text>,
}
