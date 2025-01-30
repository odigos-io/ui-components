import React, { useEffect } from 'react'
import { Text } from '../text'
import { Drawer, type DrawerProps } from '.'
import { getTheme } from '../../styles/theme'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { EditIcon, NoDataFound, TerminalIcon, Theme, TrashIcon } from '../..'

interface Props extends DrawerProps {
  darkMode: boolean
}

export default {
  title: 'Components/Drawer',
  component: Drawer,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <Drawer {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
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
            <Text size={14} color={getTheme(true).text.error} family='secondary' decoration='underline'>
              delete
            </Text>
          </>
        ),
      },
    ],
  },
}
