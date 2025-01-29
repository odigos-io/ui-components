import React, { useEffect } from 'react'
import { Theme } from '../..'
import { WarningModal, type WarningModalProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { NOTIFICATION_TYPE } from '../../@types'

interface Props extends WarningModalProps {
  darkMode: boolean
}

export default {
  title: 'Components/WarningModal',
  component: WarningModal,
}

// Create a master template for mapping props to render the Button component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <WarningModal {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  isOpen: true,
  title: 'Are you sure???',
  description: 'Like, really really sure?',
  note: {
    type: NOTIFICATION_TYPE.WARNING,
    title: 'Ayooo',
    message: 'You have to be 100% sure!',
  },
  approveButton: {
    text: 'Yes',
    onClick: () => {},
  },
  denyButton: {
    text: 'No',
    onClick: () => {},
  },
}
