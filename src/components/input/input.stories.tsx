import React from 'react'
import { Input, type InputProps } from '.'
import { type StoryFn } from '@storybook/react'

export default {
  title: 'Components/Input',
  component: Input,
}

export const Default: StoryFn<InputProps> = (props) => {
  return <Input ref={null} {...props} />
}

Default.args = {
  title: 'Password',
  type: 'password',
}
