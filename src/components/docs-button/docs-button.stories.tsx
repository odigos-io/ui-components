import React from 'react'
import { type StoryFn } from '@storybook/react'
import { DocsButton, type DocsButtonProps } from '.'

export default {
  title: 'Components/DocsButton',
  component: DocsButton,
}

export const Default: StoryFn<DocsButtonProps> = (props) => {
  return <DocsButton {...props} />
}

Default.args = {
  endpoint: '/cli/odigos',
}
