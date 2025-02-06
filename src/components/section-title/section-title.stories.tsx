import React from 'react'
import { SlackLogo } from '@odigos/ui-icons'
import { type StoryFn } from '@storybook/react'
import { SectionTitle, type SectionTitleProps } from '.'

export default {
  title: 'Components/SectionTitle',
  component: SectionTitle,
}

export const Default: StoryFn<SectionTitleProps> = (props) => {
  return <SectionTitle {...props} />
}

Default.args = {
  title: 'Title',
  description: 'Description',
  badgeLabel: 69,
  icon: SlackLogo,
}
