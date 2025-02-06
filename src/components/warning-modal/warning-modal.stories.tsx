import React from 'react'
import { type StoryFn } from '@storybook/react'
import { NOTIFICATION_TYPE } from '@odigos/ui-utils'
import { WarningModal, type WarningModalProps } from '.'

export default {
  title: 'Components/WarningModal',
  component: WarningModal,
}

export const Default: StoryFn<WarningModalProps> = (props) => {
  return <WarningModal {...props} />
}

Default.args = {
  isOpen: true,
  title: 'Are you sure???',
  description: 'Like, really really sure?',
  note: {
    type: NOTIFICATION_TYPE.WARNING,
    title: 'Ayooo',
    message: 'You have to be 100% sure!',
  },
  approveButton: {
    text: 'Yes',
    onClick: () => {},
  },
  denyButton: {
    text: 'No',
    onClick: () => {},
  },
}
