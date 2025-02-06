import React from 'react'
import { SlackLogo } from '@odigos/ui-icons'
import { NOTIFICATION_TYPE } from '@odigos/ui-utils'
import { IconWrapped, type IconWrappedProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

export default {
  title: 'Components/IconWrapped',
  component: IconWrapped,
}

// Create a master template for mapping props to render
const Template: StoryFn<IconWrappedProps> = (props) => {
  return <IconWrapped {...props} />
}

export const SvgImport: StoryObj<IconWrappedProps> = Template.bind({})

SvgImport.args = {
  icon: SlackLogo,
  size: 69,
}

export const ImageUrl: StoryObj<IconWrappedProps> = Template.bind({})

ImageUrl.args = {
  src: 'https://odigos.io/images/logo/text-logo.svg',
  alt: 'logo',
  size: 420,
  status: NOTIFICATION_TYPE.ERROR,
}
