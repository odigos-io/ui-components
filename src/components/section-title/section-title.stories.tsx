import React, { useEffect } from 'react'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { SlackLogo } from '@odigos/ui-icons'
import { Theme } from '@odigos/ui-theme'
import { SectionTitle, type SectionTitleProps } from '.'

interface Props extends SectionTitleProps {
  darkMode: boolean
}

export default {
  title: 'Components/SectionTitle',
  component: SectionTitle,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <SectionTitle {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  title: 'Title',
  description: 'Description',
  badgeLabel: 69,
  icon: SlackLogo,
}
