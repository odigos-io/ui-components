import React, { useEffect } from 'react'
import { NotificationIcon, Theme } from '../..'
import { NotificationNote, type NotificationNoteProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { NOTIFICATION_TYPE } from '../../@types'

interface Props extends NotificationNoteProps {
  darkMode: boolean
}

export default {
  title: 'Components/NotificationNote',
  component: NotificationNote,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <NotificationNote {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  type: NOTIFICATION_TYPE.WARNING,
  title: 'Stop right there!',
  message: 'You have violated the law!',
}

export const Toast: StoryObj<Props> = Template.bind({})

Toast.args = {
  darkMode: true,
  type: NOTIFICATION_TYPE.DEFAULT,
  title: 'Testing long texts...',
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula porta nisl a commodo. Donec eu lectus vel lacus bibendum commodo. Morbi semper feugiat cursus. Proin blandit consequat condimentum. Duis vel hendrerit augue, at porttitor ligula. Aliquam erat volutpat. Vestibulum non mollis urna, sit amet ornare urna. Vestibulum ullamcorper urna quis nulla finibus, ut sodales nisl euismod.',
  onClose: () => console.log('Closed!'),
}
