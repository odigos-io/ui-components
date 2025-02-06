import React, { useState } from 'react'
import { type StoryFn } from '@storybook/react'
import { Dropdown, type DropdownProps } from '.'

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
}

export const Default: StoryFn<DropdownProps> = (props) => {
  const [val, setVal] = useState({ id: '', value: '' })

  return (
    <Dropdown
      {...props}
      value={val}
      onSelect={setVal}
      onDeselect={(obj) =>
        setVal((prev) => {
          if (prev.id === obj.id) return { id: '', value: '' }
          return prev
        })
      }
    />
  )
}

Default.args = {
  showSearch: true,
  title: 'Languages',
  options: [
    {
      id: 'Go',
      value: 'Go',
    },
    {
      id: 'JavaScript',
      value: 'JavaScript',
    },
    {
      id: 'Python',
      value: 'Python',
    },
    {
      id: 'Java',
      value: 'Java',
    },
    {
      id: '.NET',
      value: '.NET',
    },
  ],
}
