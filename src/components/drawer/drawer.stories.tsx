import React, { useState } from 'react'
import { Text } from '../text'
import { NoDataFound } from '../..'
import { Drawer, type DrawerProps } from '.'
import type { StoryObj, StoryFn } from '@storybook/react'
import { EditIcon, ErrorTriangleIcon, TerminalIcon, TrashIcon } from '@odigos/ui-icons'

export default {
  title: 'Components/Drawer',
  component: Drawer,
}

// Create a master template for mapping props to render
const Template: StoryFn<DrawerProps> = (props) => {
  return <Drawer {...props} />
}

export const Default: StoryObj<DrawerProps> = Template.bind({})

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

export const WithTabs: StoryObj<DrawerProps> = Template.bind({})

WithTabs.args = {
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
    tabs: [
      {
        label: 'Overview',
        onClick: () => alert('clicked on Overview!\n(no state in storybook to handle this, but it works)'),
        selected: false,
      },
      {
        label: 'Describe',
        icon: ErrorTriangleIcon,
        onClick: () => alert('clicked on Describe!\n(no state in storybook to handle this, but it works)'),
        selected: true,
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
