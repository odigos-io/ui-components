import React, { useEffect } from 'react'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { NOTIFICATION_TYPE } from '@odigos/ui-utils'
import { Theme } from '@odigos/ui-theme'
import { ConditionDetails, type ConditionDetailsProps } from '.'

interface Props extends ConditionDetailsProps {
  darkMode: boolean
}

export default {
  title: 'Components/ConditionDetails',
  component: ConditionDetails,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <ConditionDetails {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  conditions: [
    {
      status: NOTIFICATION_TYPE.SUCCESS,
      message: 'Created successfully',
    },
    {
      status: NOTIFICATION_TYPE.SUCCESS,
      message: 'Language detected successfully',
    },
    {
      status: NOTIFICATION_TYPE.SUCCESS,
      message: 'Instrumented successfully',
    },
    {
      status: NOTIFICATION_TYPE.ERROR,
      message: 'Failed to collect data',
    },
  ],
}
