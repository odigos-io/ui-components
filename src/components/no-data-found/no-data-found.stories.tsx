import React from 'react'
import { type StoryFn } from '@storybook/react'
import { NoDataFound, type NoDataFoundProps } from '.'

export default {
  title: 'Components/NoDataFound',
  component: NoDataFound,
}

export const Default: StoryFn<NoDataFoundProps> = (props) => {
  return <NoDataFound {...props} />
}

Default.args = {}
