import React from 'react'
import { type StoryFn } from '@storybook/react'
import { ExtendArrow, type ExtendArrowProps } from '.'

export default {
  title: 'Components/ExtendArrow',
  component: ExtendArrow,
}

export const Default: StoryFn<ExtendArrowProps> = (props) => {
  return <ExtendArrow {...props} />
}

Default.args = {
  extend: false,
  size: 69,
}
