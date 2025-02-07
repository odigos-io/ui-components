import React from 'react'
import { Text } from '../text'
import Theme from '@odigos/ui-theme'
import { FlexRow } from '../../styled'
import { IconButton } from '../icon-button'
import { type StoryFn } from '@storybook/react'
import { CopyIcon, KeyIcon } from '@odigos/ui-icons'
import { InteractiveTable, type InteractiveTableProps } from '.'
import { getStatusIcon, isOverTime, NOTIFICATION_TYPE, useCopy, useTimeAgo } from '@odigos/ui-utils'

export default {
  title: 'Components/InteractiveTable',
  component: InteractiveTable,
}

export const Default: StoryFn<InteractiveTableProps> = (props) => {
  return <InteractiveTable {...props} />
}

Default.args = {
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
        const theme = Theme.useTheme()

        return (
          <Text
            size={14}
            color={isOverTime(expiresAt, 0) ? theme.text.error : isOverTime(expiresAt, 604800000) ? theme.text.warning : theme.text.success}
          >
            {useTimeAgo().format(expiresAt)} ({new Date(expiresAt).toDateString().split(' ').slice(1).join(' ')})
          </Text>
        )
      },
    },
    {
      columnKey: 'actions',
      component: () => {
        const theme = Theme.useTheme()
        const { isCopied, copiedIndex, clickCopy } = useCopy()
        const SuccessIcon = getStatusIcon(NOTIFICATION_TYPE.SUCCESS, theme)

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
