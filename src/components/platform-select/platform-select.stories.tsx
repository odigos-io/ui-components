import React from 'react'
import { PlatformSelect, type PlatformSelectProps } from '.'
import { type StoryFn } from '@storybook/react'
import { PLATFORM_TYPE } from '@odigos/ui-utils'

export default {
  title: 'Components/PlatformSelect',
  component: PlatformSelect,
}

export const Default: StoryFn<PlatformSelectProps> = (props) => {
  return <PlatformSelect {...props} />
}

Default.args = {
  type: PLATFORM_TYPE.K8S,
}
