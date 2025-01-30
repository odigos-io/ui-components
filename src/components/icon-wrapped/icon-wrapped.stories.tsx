import React, { useEffect } from 'react'
import { SlackLogo, Theme } from '../..'
import { IconWrapped, type IconWrappedProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { NOTIFICATION_TYPE } from '../../@types'

interface Props extends IconWrappedProps {
  darkMode: boolean
}

export default {
  title: 'Components/IconWrapped',
  component: IconWrapped,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <IconWrapped {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const SvgImport: StoryObj<Props> = Template.bind({})

SvgImport.args = {
  darkMode: true,
  icon: SlackLogo,
  size: 69,
}

export const ImageUrl: StoryObj<Props> = Template.bind({})

ImageUrl.args = {
  darkMode: true,
  src: 'https://odigos.io/images/logo/text-logo.svg',
  alt: 'logo',
  size: 420,
  status: NOTIFICATION_TYPE.ERROR,
}
