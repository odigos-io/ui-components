import React, { useEffect } from 'react'
import { Theme } from '../..'
import { Modal, type ModalProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { Text } from '../text'

interface Props extends ModalProps {
  darkMode: boolean
}

export default {
  title: 'Components/Modal',
  component: Modal,
}

// Create a master template for mapping props to render the Button component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <Modal {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  isOpen: true,
  onClose: () => {},
  header: { title: 'Modal Title' },
  children: <Text>Modal Content</Text>,
}
