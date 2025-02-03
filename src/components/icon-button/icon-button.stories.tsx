import React, { useEffect } from 'react'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { NotificationIcon } from '@odigos/ui-icons'
import { Theme } from '@odigos/ui-theme'
import { IconButton, type IconButtonProps } from '.'

interface Props extends IconButtonProps {
  darkMode: boolean
}

export default {
  title: 'Components/IconButton',
  component: IconButton,
}

// Create a master template for mapping props to render
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
