import React from 'react'
import { type StoryFn } from '@storybook/react'
import { FieldLabel, type FieldLabelProps } from '.'

export default {
  title: 'Components/FieldLabel',
  component: FieldLabel,
}

export const Default: StoryFn<FieldLabelProps> = (props) => {
  return <FieldLabel {...props} />
}

Default.args = {
  title: 'First Name',
  tooltip: 'The name given to you at birth',
  required: false,
}
