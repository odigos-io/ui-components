import React, { useEffect } from 'react'
import { Theme } from '../..'
import { Tooltip, type TooltipProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends TooltipProps {
  darkMode: boolean
}

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
}

// Create a master template for mapping props to render the Button component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <Tooltip {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  text: 'Hello World',
  withIcon: true,
}
