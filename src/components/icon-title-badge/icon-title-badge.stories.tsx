import React from 'react'
import type { StoryFn } from '@storybook/react'
import { IconTitleBadge, type IconTitleBadgeProps } from '.'
import { SourcesIcon } from '@odigos/ui-icons'

export default {
  title: 'Components/IconTitleBadge',
  component: IconTitleBadge,
}

export const Default: StoryFn<IconTitleBadgeProps> = (props) => {
  return <IconTitleBadge {...props} />
}

Default.args = {
  icon: SourcesIcon,
  title: 'Sources',
  badge: 69,
  loading: true,
}
