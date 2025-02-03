import React, { useEffect } from 'react'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { ACTION_OPTIONS } from '@odigos/ui-utils'
import { Theme } from '@odigos/ui-theme'
import { AutocompleteInput, type AutocompleteInputProps } from '.'

interface Props extends AutocompleteInputProps {
  darkMode: boolean
}

export default {
  title: 'Components/AutocompleteInput',
  component: AutocompleteInput,
}

// Create a master template for mapping props to render the component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <AutocompleteInput {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  title: 'Select Action',
  options: ACTION_OPTIONS,
}
