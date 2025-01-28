import React, { useEffect } from 'react'
import { ListIcon } from '.'
import { type SVG } from '../../@types'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { Theme } from '../..'

interface Props extends SVG {
  darkMode: boolean
}

export default {
  title: 'Icons/Common/List',
  component: ListIcon,
}

// Create a master template for mapping props to render the Button component
// @ts-ignore
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <ListIcon {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  // @ts-ignore
  darkMode: true,
  size: 50,
}
