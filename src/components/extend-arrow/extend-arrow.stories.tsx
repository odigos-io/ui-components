import React, { useEffect } from 'react'
import { Theme } from '../..'
import { ExtendArrow, type ExtendArrowProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends ExtendArrowProps {
  darkMode: boolean
}

export default {
  title: 'Components/ExtendArrow',
  component: ExtendArrow,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <ExtendArrow {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  extend: false,
  size: 69,
}
