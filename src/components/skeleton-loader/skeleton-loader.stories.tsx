import React, { useEffect } from 'react'
import { Theme } from '../..'
import { SkeletonLoader, type SkeletonLoaderProps } from '.'
import { type StoryFn, type StoryObj } from '@storybook/react'

interface Props extends SkeletonLoaderProps {
  darkMode: boolean
}

export default {
  title: 'Components/SkeletonLoader',
  component: SkeletonLoader,
}

// Create a master template for mapping props to render the Button component
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <SkeletonLoader {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  size: 5,
  maxWidth: '420px',
}
