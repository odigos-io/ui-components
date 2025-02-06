import React from 'react'
import { type StoryFn } from '@storybook/react'
import { NOTIFICATION_TYPE } from '@odigos/ui-utils'
import { ConditionDetails, type ConditionDetailsProps } from '.'

export default {
  title: 'Components/ConditionDetails',
  component: ConditionDetails,
}

export const Default: StoryFn<ConditionDetailsProps> = (props) => {
  return <ConditionDetails {...props} />
}

Default.args = {
  conditions: [
    {
      status: NOTIFICATION_TYPE.SUCCESS,
      message: 'Created successfully',
      lastTransitionTime: new Date().toISOString(),
    },
    {
      status: NOTIFICATION_TYPE.SUCCESS,
      message: 'Language detected successfully',
      lastTransitionTime: new Date().toISOString(),
    },
    {
      status: NOTIFICATION_TYPE.SUCCESS,
      message: 'Instrumented successfully',
      lastTransitionTime: new Date().toISOString(),
    },
    {
      status: NOTIFICATION_TYPE.ERROR,
      message: 'Failed to collect data',
      lastTransitionTime: new Date().toISOString(),
    },
  ],
}
