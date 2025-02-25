import React, { Dispatch, SetStateAction, useState } from 'react'
import type { StoryFn } from '@storybook/react'
import { IconsNav, type NavIcon, type IconsNavProps } from '.'
import { ActionsIcon, DestinationsIcon, OverviewIcon, RulesIcon, ServiceMapIcon, SourcesIcon, TraceViewIcon } from '@odigos/ui-icons'

export default {
  title: 'Components/IconsNav',
  component: IconsNav,
}

export const Default: StoryFn<IconsNavProps> = (props) => {
  const onClickIcon = (id: string, stateSetter: Dispatch<SetStateAction<NavIcon[]>>, otherStateSetter: Dispatch<SetStateAction<NavIcon[]>>) => {
    stateSetter((prev) => prev.map((item) => ({ ...item, selected: item.id === id })))
    otherStateSetter((prev) => prev.map((item) => ({ ...item, selected: false })))
  }

  const icons = [
    {
      id: 'overview',
      icon: OverviewIcon,
      selected: true,
      onClick: () => {
        onClickIcon('overview', setMainIcons, setSubIcons)
        setSubIcons(overviewIcons)
      },
    },
    {
      id: 'service-map',
      icon: ServiceMapIcon,
      selected: false,
      onClick: () => {
        onClickIcon('service-map', setMainIcons, setSubIcons)
        setSubIcons([])
      },
    },
    {
      id: 'trace-view',
      icon: TraceViewIcon,
      selected: false,
      onClick: () => {
        onClickIcon('trace-view', setMainIcons, setSubIcons)
        setSubIcons([])
      },
    },
  ]

  const overviewIcons = [
    {
      id: 'overview-rules',
      icon: RulesIcon,
      selected: false,
      onClick: () => {
        onClickIcon('overview-rules', setSubIcons, setMainIcons)
      },
      tooltip: 'only rules',
    },
    {
      id: 'overview-sources',
      icon: SourcesIcon,
      selected: false,
      onClick: () => {
        onClickIcon('overview-sources', setSubIcons, setMainIcons)
      },
      tooltip: 'only sources',
    },
    {
      id: 'overview-actions',
      icon: ActionsIcon,
      selected: false,
      onClick: () => {
        onClickIcon('overview-actions', setSubIcons, setMainIcons)
      },
      tooltip: 'only actions',
    },
    {
      id: 'overview-destinations',
      icon: DestinationsIcon,
      selected: false,
      onClick: () => {
        onClickIcon('overview-destinations', setSubIcons, setMainIcons)
      },
      tooltip: 'only destinations',
    },
  ]

  const [mainIcons, setMainIcons] = useState<IconsNavProps['mainIcons']>(icons)
  const [subIcons, setSubIcons] = useState<IconsNavProps['subIcons']>(overviewIcons)

  return <IconsNav {...props} mainIcons={mainIcons} subIcons={subIcons} />
}

Default.args = {
  orientation: 'vertical',
  flip: false,
}
