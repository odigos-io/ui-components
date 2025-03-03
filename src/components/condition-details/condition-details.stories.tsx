import React from 'react'
import { StoryObj, type StoryFn } from '@storybook/react'
import { NOTIFICATION_TYPE } from '@odigos/ui-utils'
import { ConditionDetails, type ConditionDetailsProps } from '.'

export default {
  title: 'Components/ConditionDetails',
  component: ConditionDetails,
}

// Create a master template for mapping props to render
const Template: StoryFn<ConditionDetailsProps> = (props) => {
  return <ConditionDetails {...props} />
}

const CONDITIONS = [
  {
    status: NOTIFICATION_TYPE.SUCCESS,
    type: 'LoremIpsum',
    reason: 'LoremIpsum',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis, sapien ac semper commodo, elit ligula varius libero, vitae rutrum turpis tellus sit amet felis. Nam eu massa leo. Nullam sodales justo odio, sed imperdiet magna congue ut. Aenean in sem interdum, ornare nibh porta, commodo massa. Curabitur sollicitudin tortor ligula, ac tempus sapien cursus at. Curabitur non nulla non lorem lobortis laoreet at rutrum libero. Cras a sapien tellus. Sed efficitur sit amet lectus a tempor. Vestibulum venenatis libero nisl, ut pretium orci lacinia eu. Quisque efficitur tempus justo. Curabitur gravida consectetur metus nec vulputate. Sed convallis urna in eros interdum, id pellentesque eros finibus. Etiam vitae sollicitudin arcu.',
    lastTransitionTime: new Date().toISOString(),
  },
  {
    status: NOTIFICATION_TYPE.SUCCESS,
    type: 'LoremIpsum',
    reason: 'LoremIpsum',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis, sapien ac semper commodo, elit ligula varius libero, vitae rutrum turpis tellus sit amet felis. Nam eu massa leo. Nullam sodales justo odio, sed imperdiet magna congue ut. Aenean in sem interdum, ornare nibh porta, commodo massa. Curabitur sollicitudin tortor ligula, ac tempus sapien cursus at. Curabitur non nulla non lorem lobortis laoreet at rutrum libero. Cras a sapien tellus. Sed efficitur sit amet lectus a tempor. Vestibulum venenatis libero nisl, ut pretium orci lacinia eu. Quisque efficitur tempus justo. Curabitur gravida consectetur metus nec vulputate. Sed convallis urna in eros interdum, id pellentesque eros finibus. Etiam vitae sollicitudin arcu.',
    lastTransitionTime: new Date().toISOString(),
  },
  {
    status: NOTIFICATION_TYPE.SUCCESS,
    type: 'LoremIpsum',
    reason: 'LoremIpsum',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis, sapien ac semper commodo, elit ligula varius libero, vitae rutrum turpis tellus sit amet felis. Nam eu massa leo. Nullam sodales justo odio, sed imperdiet magna congue ut. Aenean in sem interdum, ornare nibh porta, commodo massa. Curabitur sollicitudin tortor ligula, ac tempus sapien cursus at. Curabitur non nulla non lorem lobortis laoreet at rutrum libero. Cras a sapien tellus. Sed efficitur sit amet lectus a tempor. Vestibulum venenatis libero nisl, ut pretium orci lacinia eu. Quisque efficitur tempus justo. Curabitur gravida consectetur metus nec vulputate. Sed convallis urna in eros interdum, id pellentesque eros finibus. Etiam vitae sollicitudin arcu.',
    lastTransitionTime: new Date().toISOString(),
  },
  {
    status: NOTIFICATION_TYPE.SUCCESS,
    type: 'LoremIpsum',
    reason: 'LoremIpsum',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis, sapien ac semper commodo, elit ligula varius libero, vitae rutrum turpis tellus sit amet felis. Nam eu massa leo. Nullam sodales justo odio, sed imperdiet magna congue ut. Aenean in sem interdum, ornare nibh porta, commodo massa. Curabitur sollicitudin tortor ligula, ac tempus sapien cursus at. Curabitur non nulla non lorem lobortis laoreet at rutrum libero. Cras a sapien tellus. Sed efficitur sit amet lectus a tempor. Vestibulum venenatis libero nisl, ut pretium orci lacinia eu. Quisque efficitur tempus justo. Curabitur gravida consectetur metus nec vulputate. Sed convallis urna in eros interdum, id pellentesque eros finibus. Etiam vitae sollicitudin arcu.',
    lastTransitionTime: new Date().toISOString(),
  },
]

export const MixedConditions: StoryObj<ConditionDetailsProps> = Template.bind({})

MixedConditions.args = {
  conditions: CONDITIONS.map((c, idx) => ({
    ...c,
    status: idx === 0 ? NOTIFICATION_TYPE.SUCCESS : idx === 1 ? NOTIFICATION_TYPE.WARNING : idx === 2 ? NOTIFICATION_TYPE.ERROR : 'loading',
  })),
}

export const SuccessConditions: StoryObj<ConditionDetailsProps> = Template.bind({})

SuccessConditions.args = {
  conditions: CONDITIONS,
}

export const ErrorConditions: StoryObj<ConditionDetailsProps> = Template.bind({})

ErrorConditions.args = {
  conditions: CONDITIONS.map((c, idx) => ({ ...c, status: idx === CONDITIONS.length - 1 ? NOTIFICATION_TYPE.ERROR : c.status })),
}

export const WarningConditions: StoryObj<ConditionDetailsProps> = Template.bind({})

WarningConditions.args = {
  conditions: CONDITIONS.map((c, idx) => ({ ...c, status: idx === CONDITIONS.length - 1 ? NOTIFICATION_TYPE.WARNING : c.status })),
}

export const LoadingConditions: StoryObj<ConditionDetailsProps> = Template.bind({})

LoadingConditions.args = {
  conditions: CONDITIONS.map((c, idx) => ({ ...c, status: idx === CONDITIONS.length - 1 ? 'loading' : c.status })),
}
