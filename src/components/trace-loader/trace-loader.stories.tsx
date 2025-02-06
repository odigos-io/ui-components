import React from 'react'
import { type StoryFn } from '@storybook/react'
import { TraceLoader, type TraceLoaderProps } from '.'

export default {
  title: 'Components/TraceLoader',
  component: TraceLoader,
}

export const Default: StoryFn<TraceLoaderProps> = (props) => {
  return <TraceLoader {...props} />
}

Default.args = {
  width: 500,
}
