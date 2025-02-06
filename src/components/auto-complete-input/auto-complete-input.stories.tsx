import React from 'react'
import { type StoryFn } from '@storybook/react'
import { ACTION_OPTIONS } from '@odigos/ui-utils'
import { AutocompleteInput, type AutocompleteInputProps } from '.'

export default {
  title: 'Components/AutocompleteInput',
  component: AutocompleteInput,
}

export const Default: StoryFn<AutocompleteInputProps> = (props) => {
  return <AutocompleteInput {...props} />
}

Default.args = {
  title: 'Select Action',
  options: ACTION_OPTIONS,
}
