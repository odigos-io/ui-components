import React from 'react'
import { Divider, type DividerProps } from '.'
import { type StoryFn } from '@storybook/react'

export default {
  title: 'Components/Divider',
  component: Divider,
}

export const Default: StoryFn<DividerProps> = (props) => {
  return <Divider {...props} />
}

Default.args = {
  orientation: 'horizontal',
  thickness: 1,
  length: '100%',
}
