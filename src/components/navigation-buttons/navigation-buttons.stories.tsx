import React from 'react'
import { ArrowIcon } from '@odigos/ui-icons'
import { type StoryFn } from '@storybook/react'
import { NavigationButtons, type NavigationButtonsProps } from '.'

export default {
  title: 'Components/NavigationButtons',
  component: NavigationButtons,
}

export const Default: StoryFn<NavigationButtonsProps> = (props) => {
  return <NavigationButtons {...props} />
}

Default.args = {
  buttons: [
    {
      label: 'BACK',
      icon: ArrowIcon,
      variant: 'secondary',
      onClick: () => {},
    },
    {
      label: 'DONE',
      variant: 'primary',
      onClick: () => {},
    },
  ],
}
