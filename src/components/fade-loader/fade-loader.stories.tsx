import React from 'react'
import { type StoryFn } from '@storybook/react'
import { FadeLoader, type FadeLoaderProps } from '.'

export default {
  title: 'Components/FadeLoader',
  component: FadeLoader,
}

export const Default: StoryFn<FadeLoaderProps> = (props) => {
  return <FadeLoader {...props} />
}

Default.args = {
  scale: 2,
}
