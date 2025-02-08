import React from 'react'
import { Stepper, type StepperProps } from '.'
import { type StoryFn } from '@storybook/react'

export default {
  title: 'Components/Stepper',
  component: Stepper,
}

export const Default: StoryFn<StepperProps> = (props) => {
  return <Stepper {...props} />
}

Default.args = {
  currentStep: 2,
  data: [
    {
      stepNumber: 1,
      title: 'INSTALLATION',
    },
    {
      stepNumber: 2,
      title: 'SOURCES',
    },
    {
      stepNumber: 3,
      title: 'DESTINATIONS',
    },
  ],
}
