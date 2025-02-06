import React from 'react'
import { Text } from '../text'
import { NoDataFound } from '../..'
import { Drawer, type DrawerProps } from '.'
import { type StoryFn } from '@storybook/react'
import { EditIcon, TerminalIcon, TrashIcon } from '@odigos/ui-icons'

export default {
  title: 'Components/Drawer',
  component: Drawer,
}

export const Default: StoryFn<DrawerProps> = (props) => {
  return <Drawer {...props} />
}

Default.args = {
  isOpen: true,
  onClose: () => {},
  width: '700px',
  children: <NoDataFound />,
  header: {
    icon: TerminalIcon,
    title: 'Odigos CLI',
    titleTooltip: 'This is a tooltip',
    actionButtons: [
      {
        'data-id': 'drawer-edit',
        variant: 'tertiary',
        onClick: () => {},
        children: (
          <>
            <EditIcon />
            <Text size={14} family='secondary' decoration='underline'>
              Edit
            </Text>
          </>
        ),
      },
    ],
  },
  footer: {
    isOpen: true,
    leftButtons: [
      {
        'data-id': 'drawer-save',
        variant: 'primary',
        onClick: () => {},
        children: 'save',
      },
      {
        'data-id': 'drawer-cancel',
        variant: 'secondary',
        onClick: () => {},
        children: 'cancel',
      },
    ],
    rightButtons: [
      {
        'data-id': 'drawer-delete',
        variant: 'tertiary',
        onClick: () => {},
        children: (
          <>
            <TrashIcon />
            <Text size={14} family='secondary' decoration='underline'>
              delete
            </Text>
          </>
        ),
      },
    ],
  },
}
