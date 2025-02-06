import React from 'react'
import { type StoryFn } from '@storybook/react'
import { SkeletonLoader, type SkeletonLoaderProps } from '.'

export default {
  title: 'Components/SkeletonLoader',
  component: SkeletonLoader,
}

export const Default: StoryFn<SkeletonLoaderProps> = (props) => {
  return <SkeletonLoader {...props} />
}

Default.args = {
  size: 5,
  maxWidth: '420px',
}
