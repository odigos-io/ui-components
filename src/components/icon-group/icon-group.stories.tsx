import React from 'react'
import { OdigosLogo } from '@odigos/ui-icons'
import { IconGroup, type IconGroupProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { getProgrammingLanguageIcon, NOTIFICATION_TYPE, PROGRAMMING_LANGUAGES } from '@odigos/ui-utils'

export default {
  title: 'Components/IconGroup',
  component: IconGroup,
}

// Create a master template for mapping props to render
const Template: StoryFn<IconGroupProps> = (props) => {
  return <IconGroup {...props} />
}

export const SvgImportsMaxAmount: StoryObj<IconGroupProps> = Template.bind({})

SvgImportsMaxAmount.args = {
  icons: [OdigosLogo, OdigosLogo, OdigosLogo, OdigosLogo],
  size: 100,
  status: NOTIFICATION_TYPE.ERROR,
}

export const SvgImportsHalfAmount: StoryObj<IconGroupProps> = Template.bind({})

SvgImportsHalfAmount.args = {
  icons: [OdigosLogo, OdigosLogo],
  size: 100,
}

export const SvgImportsMinAmount: StoryObj<IconGroupProps> = Template.bind({})

SvgImportsMinAmount.args = {
  icons: [OdigosLogo],
  size: 100,
}

export const ImageUrlsMaxAmount: StoryObj<IconGroupProps> = Template.bind({})

ImageUrlsMaxAmount.args = {
  iconSrcs: [
    getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.GO),
    getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.PYTHON),
    getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.JAVASCRIPT),
    getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.JAVA),
  ],
  status: NOTIFICATION_TYPE.ERROR,
  size: 100,
}

export const ImageUrlsHalfAmount: StoryObj<IconGroupProps> = Template.bind({})

ImageUrlsHalfAmount.args = {
  iconSrcs: [getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.GO), getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.PYTHON)],
  size: 100,
}

export const ImageUrlsMinAmount: StoryObj<IconGroupProps> = Template.bind({})

ImageUrlsMinAmount.args = {
  iconSrcs: [getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.GO)],
  size: 100,
}
