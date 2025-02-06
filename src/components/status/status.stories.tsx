import React from 'react'
import { Status, type StatusProps } from '.'
import { type StoryFn } from '@storybook/react'
import { NOTIFICATION_TYPE } from '@odigos/ui-utils'

export default {
  title: 'Components/Status',
  component: Status,
}

export const Default: StoryFn<StatusProps> = (props) => {
  return <Status {...props} />
}

Default.args = {
  title: 'Ayooo',
  subtitle: 'This is pretty cool',
  status: NOTIFICATION_TYPE.WARNING,
  withIcon: true,
  withBorder: true,
  withBackground: true,
}
