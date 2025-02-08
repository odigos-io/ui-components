import React from 'react'
import { Status } from '../status'
import { Tooltip } from '../tooltip'
import { Header, type HeaderProps } from '.'
import { type StoryFn } from '@storybook/react'
import { OdigosLogoText, SlackLogo, TerminalIcon } from '@odigos/ui-icons'
import { PlatformSelect } from '../platform-select'
import { NOTIFICATION_TYPE, PLATFORM_TYPE } from '@odigos/ui-utils'
import Theme from '@odigos/ui-theme'
import { IconButton } from '../icon-button'
import { Text } from '../text'

export default {
  title: 'Components/Header',
  component: Header,
}

export const Default: StoryFn<HeaderProps> = (props) => {
  return <Header {...props} />
}

const readonly = false

Default.args = {
  left: [
    <OdigosLogoText size={100} />,
    <PlatformSelect type={PLATFORM_TYPE.K8S} />,
    <Status
      status={NOTIFICATION_TYPE.SUCCESS}
      title='Connected'
      subtitle='Connected to the server'
      size={14}
      family='primary'
      withIcon
      withBackground
    />,
    readonly && (
      <Tooltip text="You're not allowed to create/update/delete in readonly mode">
        <Status status={NOTIFICATION_TYPE.INFO} title='Read Only' size={14} family='primary' withIcon withBackground />
      </Tooltip>
    ),
  ],

  right: [
    <Theme.ToggleDarkMode />,
    <IconButton onClick={() => {}} tooltip='Odigos CLI'>
      <TerminalIcon size={18} />
    </IconButton>,
    <IconButton onClick={() => {}} tooltip='Join our Slack community'>
      <SlackLogo />
    </IconButton>,
  ],
}
