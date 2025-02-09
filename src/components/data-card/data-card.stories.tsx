import React from 'react'
import { type StoryFn } from '@storybook/react'
import { PROGRAMMING_LANGUAGES } from '@odigos/ui-utils'
import { DATA_CARD_FIELD_TYPES, DataCard, type DataCardProps } from '.'

export default {
  title: 'Components/DataCard',
  component: DataCard,
}

export const Default: StoryFn<DataCardProps> = (props) => {
  return <DataCard {...props} />
}

Default.args = {
  title: 'Detected Containers',
  titleBadge: 1,
  description: 'The system automatically instruments the containers it detects with a supported programming language.',
  data: [
    {
      type: DATA_CARD_FIELD_TYPES.SOURCE_CONTAINER,
      width: '100%',
      value: JSON.stringify({
        containerName: 'my-container',
        language: PROGRAMMING_LANGUAGES.PYTHON,
        instrumented: true,
        instrumentationMessage: '',
        otelDistroName: 'golang-community',
        runtimeVersion: '3.8',
        otherAgent: null,
      }),
    },
  ],
}
