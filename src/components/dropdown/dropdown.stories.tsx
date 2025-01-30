import React, { useEffect, useState } from 'react'
import { Theme } from '../..'
import { Dropdown, type DropdownProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends DropdownProps {
  darkMode: boolean
}

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
}

// Create a master template for mapping props to render the component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  const [val, setVal] = useState({ id: '', value: '' })

  return (
    <Theme.Provider darkMode={darkMode}>
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
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  title: 'Gender',
  options: [
    {
      id: 'Male',
      value: 'Male',
    },
    {
      id: 'Female',
      value: 'Female',
    },
  ],
}
