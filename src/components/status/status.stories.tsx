import React, { useEffect } from 'react'
import { Theme } from '../..'
import { Status, type StatusProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { NOTIFICATION_TYPE } from '../../@types'

interface Props extends StatusProps {
  darkMode: boolean
}

export default {
  title: 'Components/Status',
  component: Status,
}

// Create a master template for mapping props to render the Button component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <Status {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  title: 'Ayooo',
  subtitle: 'This is pretty cool',
  status: NOTIFICATION_TYPE.WARNING,
  withIcon: true,
  withBorder: true,
  withBackground: true,
}
