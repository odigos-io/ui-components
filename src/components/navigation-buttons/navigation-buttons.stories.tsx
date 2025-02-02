import React, { useEffect } from 'react'
import { ArrowIcon, Theme } from '../..'
import { NavigationButtons, type NavigationButtonsProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends NavigationButtonsProps {
  darkMode: boolean
}

export default {
  title: 'Components/NavigationButtons',
  component: NavigationButtons,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <NavigationButtons {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  buttons: [
    {
      label: 'BACK',
      icon: ArrowIcon,
      variant: 'secondary',
      onClick: () => {},
    },
    {
      label: 'DONE',
      variant: 'primary',
      onClick: () => {},
    },
  ],
}
