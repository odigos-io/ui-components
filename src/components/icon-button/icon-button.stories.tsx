import React from 'react'
import { type StoryFn } from '@storybook/react'
import { NotificationIcon } from '@odigos/ui-icons'
import { IconButton, type IconButtonProps } from '.'

export default {
  title: 'Components/IconButton',
  component: IconButton,
}

export const Default: StoryFn<IconButtonProps> = (props) => {
  return <IconButton {...props} />
}

Default.args = {
  children: <NotificationIcon size={20} />,
  withPing: true,
  pingColor: 'orange',
}
