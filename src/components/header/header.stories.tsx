import React from 'react'
import { Status } from '../status'
import Theme from '@odigos/ui-theme'
import { IconButton } from '../icon-button'
import { Header, type HeaderProps } from '.'
import { type StoryFn } from '@storybook/react'
import { NOTIFICATION_TYPE } from '@odigos/ui-utils'
import { OdigosLogoText, SlackLogo, TerminalIcon } from '@odigos/ui-icons'

export default {
  title: 'Components/Header',
  component: Header,
}

export const Default: StoryFn<HeaderProps> = (props) => {
  return <Header {...props} />
}

Default.args = {
  left: [
    <OdigosLogoText size={100} />,
    <Status
      status={NOTIFICATION_TYPE.SUCCESS}
      title='Connected'
      subtitle='Connected to the server'
      size={14}
      family='primary'
      withIcon
      withBackground
    />,
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
