import React from 'react'
import { NOTIFICATION_TYPE } from '@odigos/ui-utils'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { NotificationNote, type NotificationNoteProps } from '.'

export default {
  title: 'Components/NotificationNote',
  component: NotificationNote,
}

// Create a master template for mapping props to render
const Template: StoryFn<NotificationNoteProps> = (props) => {
  return <NotificationNote {...props} />
}

export const Default: StoryObj<NotificationNoteProps> = Template.bind({})

Default.args = {
  type: NOTIFICATION_TYPE.WARNING,
  title: 'Stop right there!',
  message: 'You have violated the law!',
}

export const LongText: StoryObj<NotificationNoteProps> = Template.bind({})

LongText.args = {
  type: NOTIFICATION_TYPE.DEFAULT,
  overrideMaxWidth: '100%',
  title: 'Testing long texts...',
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula porta nisl a commodo. Donec eu lectus vel lacus bibendum commodo. Morbi semper feugiat cursus. Proin blandit consequat condimentum. Duis vel hendrerit augue, at porttitor ligula. Aliquam erat volutpat. Vestibulum non mollis urna, sit amet ornare urna. Vestibulum ullamcorper urna quis nulla finibus, ut sodales nisl euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula porta nisl a commodo. Donec eu lectus vel lacus bibendum commodo. Morbi semper feugiat cursus. Proin blandit consequat condimentum. Duis vel hendrerit augue, at porttitor ligula. Aliquam erat volutpat. Vestibulum non mollis urna, sit amet ornare urna. Vestibulum ullamcorper urna quis nulla finibus, ut sodales nisl euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula porta nisl a commodo. Donec eu lectus vel lacus bibendum commodo. Morbi semper feugiat cursus. Proin blandit consequat condimentum. Duis vel hendrerit augue, at porttitor ligula. Aliquam erat volutpat. Vestibulum non mollis urna, sit amet ornare urna. Vestibulum ullamcorper urna quis nulla finibus, ut sodales nisl euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula porta nisl a commodo. Donec eu lectus vel lacus bibendum commodo. Morbi semper feugiat cursus. Proin blandit consequat condimentum. Duis vel hendrerit augue, at porttitor ligula. Aliquam erat volutpat. Vestibulum non mollis urna, sit amet ornare urna. Vestibulum ullamcorper urna quis nulla finibus, ut sodales nisl euismod.',
}
