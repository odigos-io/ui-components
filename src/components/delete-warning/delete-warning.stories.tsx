import React from 'react'
import { type StoryFn } from '@storybook/react'
import { DeleteWarning, type DeleteWarningProps } from '.'

export default {
  title: 'Components/DeleteWarning',
  component: DeleteWarning,
}

export const Default: StoryFn<DeleteWarningProps> = (props) => {
  return <DeleteWarning {...props} />
}

Default.args = {
  isOpen: true,
  name: '11 Sources',
  isLastItem: true,
  onApprove: () => {},
  onDeny: () => {},
}
