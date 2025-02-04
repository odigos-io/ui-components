import React, { useEffect } from 'react'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { PROGRAMMING_LANGUAGES } from '@odigos/ui-utils'
import { Theme } from '@odigos/ui-theme'
import { DATA_CARD_FIELD_TYPES, DataCard, type DataCardProps } from '.'

interface Props extends DataCardProps {
  darkMode: boolean
}

export default {
  title: 'Components/DataCard',
  component: DataCard,
}

// Create a master template for mapping props to render the component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <DataCard {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
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
