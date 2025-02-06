import React from 'react'
import { Button, type ButtonProps } from '.'
import { type StoryFn } from '@storybook/react'

export default {
  title: 'Components/Button',
  component: Button,
}

export const Default: StoryFn<ButtonProps> = (props) => {
  return <Button {...props} />
}

Default.args = {
  variant: 'primary',
  children: 'click me',
}
