import { StoryObj } from '@storybook/react'
import { Button } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
}

export const Default: StoryObj<typeof Button> = {
  args: {
    children: 'Button',
  },
}
