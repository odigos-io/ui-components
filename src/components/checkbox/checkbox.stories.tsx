import React, { useEffect, useState } from 'react'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { Theme } from '@odigos/ui-theme'
import { Checkbox, type CheckboxProps } from '.'
import { Divider } from '../divider'

interface Props extends CheckboxProps {
  darkMode: boolean
}

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
}

// Create a master template for mapping props to render the component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  const [isChecked, setIsChecked] = useState(props.value)
  const [isPartChecked, setIsPartChecked] = useState(props.partiallyChecked)
  const [list, setList] = useState(new Array(10).fill(false))

  useEffect(() => {
    setIsChecked(list.every((v) => v))
    setIsPartChecked(list.some((v) => v) && list.some((v) => !v))
  }, [list])

  return (
    <Theme.Provider darkMode={darkMode}>
      <Checkbox
        {...props}
        value={isChecked}
        partiallyChecked={isPartChecked}
        onChange={(bool) => {
          setIsChecked(bool)
          setIsPartChecked(false)
          setList(new Array(10).fill(bool))
        }}
      />

      <Divider />

      {list.map((v, i) => (
        <Checkbox
          key={i}
          title={`Pokemon ${i + 1}`}
          value={v}
          onChange={(bool) => {
            setList((prev) => {
              const newList = [...prev]
              newList[i] = bool
              return newList
            })
          }}
          style={{ marginBottom: 8 }}
        />
      ))}
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  title: 'Did you collect them all?',
}
