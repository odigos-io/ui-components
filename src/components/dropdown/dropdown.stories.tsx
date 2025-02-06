import React, { useEffect, useState } from 'react'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { Theme } from '@odigos/ui-theme'
import { Dropdown, type DropdownProps } from '.'

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
