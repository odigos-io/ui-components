import React from 'react'
import { type StoryFn } from '@storybook/react'
import { InputList, type InputListProps } from '.'

export default {
  title: 'Components/InputList',
  component: InputList,
}

export const Default: StoryFn<InputListProps> = (props) => {
  return <InputList {...props} />
}

Default.args = {
  title: 'Pet Names 🐶🐱',
}
