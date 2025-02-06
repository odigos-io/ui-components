import React, { useState } from 'react'
import { SIGNAL_TYPE } from '@odigos/ui-utils'
import { type StoryFn } from '@storybook/react'
import { MonitorsCheckboxes, type MonitorsCheckboxesProps } from '.'

export default {
  title: 'Components/MonitorsCheckboxes',
  component: MonitorsCheckboxes,
}

export const Default: StoryFn<MonitorsCheckboxesProps> = (props) => {
  const [val, setVal] = useState<SIGNAL_TYPE[]>([SIGNAL_TYPE.LOGS])

  return <MonitorsCheckboxes {...props} selectedSignals={val} setSelectedSignals={setVal} />
}

Default.args = {}
