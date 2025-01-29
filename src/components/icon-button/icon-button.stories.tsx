import React, { useEffect } from 'react'
import { NotificationIcon, Theme } from '../..'
import { IconButton, type IconButtonProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends IconButtonProps {
  darkMode: boolean
}

export default {
  title: 'Components/IconButton',
  component: IconButton,
}

// Create a master template for mapping props to render the Button component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <IconButton {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  children: <NotificationIcon size={20} />,
  withPing: true,
  pingColor: 'orange',
}
