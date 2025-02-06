import React from 'react'
import { Text } from '../text'
import { Modal, type ModalProps } from '.'
import { type StoryFn } from '@storybook/react'

export default {
  title: 'Components/Modal',
  component: Modal,
}

export const Default: StoryFn<ModalProps> = (props) => {
  return <Modal {...props} />
}

Default.args = {
  isOpen: true,
  onClose: () => {},
  header: { title: 'Modal Title' },
  children: <Text>Modal Content</Text>,
}
