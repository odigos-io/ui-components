import React from 'react'
import { Badge, type BadgeProps } from '.'
import { NOTIFICATION_TYPE } from '@odigos/ui-utils'
import type { StoryObj, StoryFn } from '@storybook/react'

export default {
  title: 'Components/Badge',
  component: Badge,
}

// Create a master template for mapping props to render
const Template: StoryFn<BadgeProps> = (props) => {
  return <Badge {...props} />
}

export const Default: StoryObj<BadgeProps> = Template.bind({})

Default.args = {
  label: 69,
}

export const DefaultFilled: StoryObj<BadgeProps> = Template.bind({})

DefaultFilled.args = {
  label: 69,
  filled: true,
}

export const StatusSuccess: StoryObj<BadgeProps> = Template.bind({})

StatusSuccess.args = {
  label: 69,
  filled: true,
  status: NOTIFICATION_TYPE.SUCCESS,
  withIcon: true,
}

export const StatusError: StoryObj<BadgeProps> = Template.bind({})

StatusError.args = {
  label: 69,
  filled: true,
  status: NOTIFICATION_TYPE.ERROR,
  withIcon: true,
}

export const StatusWarn: StoryObj<BadgeProps> = Template.bind({})

StatusWarn.args = {
  label: 69,
  filled: true,
  status: NOTIFICATION_TYPE.WARNING,
  withIcon: true,
}
