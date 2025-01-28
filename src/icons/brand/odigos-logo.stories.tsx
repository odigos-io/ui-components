import React, { useEffect } from 'react'
import { Theme } from '../..'
import { OdigosLogo } from '.'
import { type SVG } from '../../@types'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends SVG {
  darkMode: boolean
}

export default {
  title: 'Icons/Brand/Odigos Logo',
  component: OdigosLogo,
}

// Create a master template for mapping props to render the Button component
// @ts-ignore
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <OdigosLogo {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  // @ts-ignore
  darkMode: true,
  size: 50,
}
