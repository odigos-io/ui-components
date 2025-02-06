import React, { useState } from 'react'
import { Toggle, type ToggleProps } from '.'
import { type StoryFn } from '@storybook/react'

export default {
  title: 'Components/Toggle',
  component: Toggle,
}

export const Default: StoryFn<ToggleProps> = (props) => {
  const [val, setVal] = useState(false)

  return <Toggle {...props} initialValue={val} onChange={setVal} />
}

Default.args = {
  title: 'Deploy on Friday',
  tooltip: 'We don’t recommend deploying on Fridays',
}
