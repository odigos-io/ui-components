import React, { useState } from 'react'
import { Segment, type SegmentProps } from '.'
import { type StoryFn } from '@storybook/react'
import { CheckCircledIcon, CrossCircledIcon } from '@odigos/ui-icons'

export default {
  title: 'Components/Segment',
  component: Segment,
}

export const Default: StoryFn<SegmentProps> = (props) => {
  const [val, setVal] = useState(true)

  return <Segment {...props} selected={val} setSelected={setVal} />
}

Default.args = {
  options: [
    { icon: CheckCircledIcon, label: 'active', value: true, selectedBgColor: 'green' },
    { icon: CrossCircledIcon, label: 'inactive', value: false, selectedBgColor: 'red' },
  ],
}
