import React from 'react'
import { type StoryFn } from '@storybook/react'
import { TextArea, type TextAreaProps } from '.'

export default {
  title: 'Components/TextArea',
  component: TextArea,
}

export const Default: StoryFn<TextAreaProps> = (props) => {
  return <TextArea {...props} />
}

Default.args = {
  title: 'Notes',
}
