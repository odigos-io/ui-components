import React from 'react'
import { type StoryFn } from '@storybook/react'
import { CancelWarning, type CancelWarningProps } from '.'

export default {
  title: 'Components/CancelWarning',
  component: CancelWarning,
}

export const Default: StoryFn<CancelWarningProps> = (props) => {
  return <CancelWarning {...props} />
}

Default.args = {
  isOpen: true,
  name: 'Subscription',
  onApprove: () => {},
  onDeny: () => {},
}
