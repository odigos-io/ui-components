import React, { useEffect } from 'react'
import { getTheme } from '../../styles'
import { ThemeProvider } from 'styled-components'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { type SVG } from '../../@types'
import { ServiceMapIcon } from '.'

interface Props extends SVG {
  darkMode: boolean
}

export default {
  title: 'Icons/Overview/Service Map',
  component: ServiceMapIcon,
}

// Create a master template for mapping props to render the Button component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <ServiceMapIcon {...props} />
    </ThemeProvider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  size: 50,
}
