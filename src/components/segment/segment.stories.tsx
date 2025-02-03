import React, { useEffect, useState } from 'react'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { CheckCircledIcon, CrossCircledIcon } from '@odigos/ui-icons'
import { Theme } from '@odigos/ui-theme'
import { Segment, type SegmentProps } from '.'

interface Props extends SegmentProps {
  darkMode: boolean
}

export default {
  title: 'Components/Segment',
  component: Segment,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  const [val, setVal] = useState(true)

  return (
    <Theme.Provider darkMode={darkMode}>
      <Segment {...props} selected={val} setSelected={setVal} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  options: [
    { icon: CheckCircledIcon, label: 'active', value: true, selectedBgColor: 'green' },
    { icon: CrossCircledIcon, label: 'inactive', value: false, selectedBgColor: 'red' },
  ],
}
