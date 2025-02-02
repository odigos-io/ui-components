import React, { useEffect } from 'react'
import { CopyIcon, FlexRow, getStatusIcon, IconButton, isOverTime, KeyIcon, Text, Theme, useCopy } from '../..'
import { InteractiveTable, type InteractiveTableProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { getTheme } from '../../styles/theme'
import { NOTIFICATION_TYPE } from '../../@types'
import { useTimeAgo } from '../../hooks'

interface Props extends InteractiveTableProps {
  darkMode: boolean
}

export default {
  title: 'Components/InteractiveTable',
  component: InteractiveTable,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <InteractiveTable {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  columns: [
    { key: 'icon', title: '' },
    { key: 'name', title: 'Name' },
    { key: 'expires_at', title: 'Expires' },
    { key: 'token', title: 'Token' },
    { key: 'actions', title: '' },
  ],
  rows: [{ token: '132456789', name: 'Test', expiresAt: 0 }].map(({ token, name, expiresAt }, idx) => [
    { columnKey: 'icon', icon: KeyIcon },
    { columnKey: 'name', value: name },
    { columnKey: 'token', value: `${new Array(15).fill('•').join('')}` },
    {
      columnKey: 'expires_at',
      component: () => {
        return (
          <Text
            size={14}
            color={
              isOverTime(expiresAt, 0)
                ? getTheme(true).text.error
                : isOverTime(expiresAt, 604800000)
                ? getTheme(true).text.warning
                : getTheme(true).text.success
            }
          >
            {useTimeAgo().format(expiresAt)} ({new Date(expiresAt).toDateString().split(' ').slice(1).join(' ')})
          </Text>
        )
      },
    },
    {
      columnKey: 'actions',
      component: () => {
        const { isCopied, copiedIndex, clickCopy } = useCopy()
        const SuccessIcon = getStatusIcon(NOTIFICATION_TYPE.SUCCESS)

        return (
          <FlexRow $gap={0}>
            <IconButton size={32} onClick={() => clickCopy(token, idx)}>
              {isCopied && copiedIndex === idx ? <SuccessIcon /> : <CopyIcon />}
            </IconButton>
          </FlexRow>
        )
      },
    },
  ]),
}
