import React, { useEffect } from 'react'
import { Theme } from '../..'
import { PayloadCollectionIcon } from '.'
import { type SVG } from '../../@types'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends SVG {
  darkMode: boolean
}

export default {
  title: 'Icons/Instrumentation Rules/Payload Collection',
  component: PayloadCollectionIcon,
}

// Create a master template for mapping props to render
// @ts-ignore
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <PayloadCollectionIcon {...props} />
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
