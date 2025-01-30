import React, { useEffect } from 'react'
import { Theme } from '../..'
import { TextArea, type TextAreaProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends TextAreaProps {
  darkMode: boolean
}

export default {
  title: 'Components/TextArea',
  component: TextArea,
}

// Create a master template for mapping props to render the component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <TextArea {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  title: 'Notes',
}
