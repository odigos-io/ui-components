import React, { useEffect, useState } from 'react'
import { Theme } from '../..'
import { MonitorsCheckboxes, type MonitorsCheckboxesProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { SIGNAL_TYPE } from '../../@types'

interface Props extends MonitorsCheckboxesProps {
  darkMode: boolean
}

export default {
  title: 'Components/MonitorsCheckboxes',
  component: MonitorsCheckboxes,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  const [val, setVal] = useState<SIGNAL_TYPE[]>([SIGNAL_TYPE.LOGS])

  return (
    <Theme.Provider darkMode={darkMode}>
      <MonitorsCheckboxes {...props} selectedSignals={val} setSelectedSignals={setVal} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
}
