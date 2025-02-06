import React from 'react'
import { type StoryFn } from '@storybook/react'
import { FieldError, type FieldErrorProps } from '.'

export default {
  title: 'Components/FieldError',
  component: FieldError,
}

export const Default: StoryFn<FieldErrorProps> = (props) => {
  return <FieldError {...props} />
}

Default.args = {
  children: 'This field is required!',
}
