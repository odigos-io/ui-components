import React from 'react'
import { type StoryFn } from '@storybook/react'
import { KeyValueInputsList, type KeyValueInputsListProps } from '.'

export default {
  title: 'Components/KeyValueInputsList',
  component: KeyValueInputsList,
}

export const Default: StoryFn<KeyValueInputsListProps> = (props) => {
  return <KeyValueInputsList {...props} />
}

Default.args = {
  title: 'Request Headers',
}
