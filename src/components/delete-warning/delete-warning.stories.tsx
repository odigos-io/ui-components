import React, { useEffect } from 'react'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { Theme } from '@odigos/ui-theme'
import { DeleteWarning, type DeleteWarningProps } from '.'

interface Props extends DeleteWarningProps {
  darkMode: boolean
}

export default {
  title: 'Components/DeleteWarning',
  component: DeleteWarning,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <DeleteWarning {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  isOpen: true,
  name: '11 Sources',
  isLastItem: true,
  onApprove: () => {},
  onDeny: () => {},
}
