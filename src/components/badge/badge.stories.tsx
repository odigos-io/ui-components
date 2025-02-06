import React from 'react'
import { Badge, type BadgeProps } from '.'
import { type StoryFn } from '@storybook/react'

export default {
  title: 'Components/Badge',
  component: Badge,
}

export const Default: StoryFn<BadgeProps> = (props) => {
  return <Badge {...props} />
}

Default.args = {
  label: 69,
  filled: true,
}
