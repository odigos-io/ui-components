import React from 'react'
import type { StoryFn } from '@storybook/react'
import { ImageControlled, type ImageControlledProps } from '.'
import { getProgrammingLanguageIcon, PROGRAMMING_LANGUAGES } from '@odigos/ui-utils'

export default {
  title: 'Components/ImageControlled',
  component: ImageControlled,
}

export const Default: StoryFn<ImageControlledProps> = (props) => {
  return <ImageControlled {...props} />
}

Default.args = {
  src: getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.GO),
  size: 69,
}
