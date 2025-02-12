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
      type: 'LoremIpsum',
      reason: 'LoremIpsum',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis, sapien ac semper commodo, elit ligula varius libero, vitae rutrum turpis tellus sit amet felis. Nam eu massa leo. Nullam sodales justo odio, sed imperdiet magna congue ut. Aenean in sem interdum, ornare nibh porta, commodo massa. Curabitur sollicitudin tortor ligula, ac tempus sapien cursus at. Curabitur non nulla non lorem lobortis laoreet at rutrum libero. Cras a sapien tellus. Sed efficitur sit amet lectus a tempor. Vestibulum venenatis libero nisl, ut pretium orci lacinia eu. Quisque efficitur tempus justo. Curabitur gravida consectetur metus nec vulputate. Sed convallis urna in eros interdum, id pellentesque eros finibus. Etiam vitae sollicitudin arcu.',
      lastTransitionTime: new Date().toISOString(),
    },
    {
      status: NOTIFICATION_TYPE.ERROR,
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
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      lastTransitionTime: new Date().toISOString(),
    },
    {
      status: NOTIFICATION_TYPE.WARNING,
      type: 'LoremIpsum',
      reason: 'LoremIpsum',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis, sapien ac semper commodo, elit ligula varius libero, vitae rutrum turpis tellus sit amet felis. Nam eu massa leo. Nullam sodales justo odio, sed imperdiet magna congue ut. Aenean in sem interdum, ornare nibh porta, commodo massa. Curabitur sollicitudin tortor ligula, ac tempus sapien cursus at. Curabitur non nulla non lorem lobortis laoreet at rutrum libero. Cras a sapien tellus. Sed efficitur sit amet lectus a tempor. Vestibulum venenatis libero nisl, ut pretium orci lacinia eu. Quisque efficitur tempus justo. Curabitur gravida consectetur metus nec vulputate. Sed convallis urna in eros interdum, id pellentesque eros finibus. Etiam vitae sollicitudin arcu.',
      lastTransitionTime: new Date().toISOString(),
    },
  ],
}
