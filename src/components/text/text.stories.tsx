import React from 'react'
import { Text, type TextProps } from '.'
import { type StoryFn } from '@storybook/react'

export default {
  title: 'Components/Text',
  component: Text,
}

export const Default: StoryFn<TextProps> = (props) => {
  return <Text {...props} />
}

Default.args = {
  children: 'Hello World',
}
