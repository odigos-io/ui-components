import React, { useEffect } from 'react'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { Theme } from '@odigos/ui-theme'
import { CancelWarning, type CancelWarningProps } from '.'

interface Props extends CancelWarningProps {
  darkMode: boolean
}

export default {
  title: 'Components/CancelWarning',
  component: CancelWarning,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <CancelWarning {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  isOpen: true,
  name: 'Subscription',
  onApprove: () => {},
  onDeny: () => {},
}
