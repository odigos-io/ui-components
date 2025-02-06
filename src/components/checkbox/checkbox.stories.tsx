import React, { Fragment, useEffect, useState } from 'react'
import { Divider } from '../divider'
import { type StoryFn } from '@storybook/react'
import { Checkbox, type CheckboxProps } from '.'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
}

export const Default: StoryFn<CheckboxProps> = (props) => {
  const [isChecked, setIsChecked] = useState(props.value)
  const [isPartChecked, setIsPartChecked] = useState(props.partiallyChecked)
  const [list, setList] = useState(new Array(10).fill(false))

  useEffect(() => {
    setIsChecked(list.every((v) => v))
    setIsPartChecked(list.some((v) => v) && list.some((v) => !v))
  }, [list])

  return (
    <Fragment>
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
    </Fragment>
  )
}

Default.args = {
  title: 'Did you collect them all?',
}
