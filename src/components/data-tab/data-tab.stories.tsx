import React, { useEffect } from 'react'
import { type StoryFn, type StoryObj } from '@storybook/react'
import { getProgrammingLanguageIcon, PROGRAMMING_LANGUAGES } from '@odigos/ui-utils'
import { ErrorTriangleIcon } from '@odigos/ui-icons'
import { Theme } from '@odigos/ui-theme'
import { DataTab, type DataTabProps } from '.'
import { Checkbox } from '../..'

interface Props extends DataTabProps {
  darkMode: boolean
}

export default {
  title: 'Components/DataTab',
  component: DataTab,
}

// Create a master template for mapping props to render
const Template: StoryFn<Props> = ({ darkMode, ...props }) => {
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff'
  }, [darkMode])

  return (
    <Theme.Provider darkMode={darkMode}>
      <DataTab {...props} />
    </Theme.Provider>
  )
}

// Reuse that template for creating different stories
export const Default: StoryObj<Props> = Template.bind({})

Default.args = {
  darkMode: true,
  title: 'node-auth-service-v69',
  subTitle: 'default • deployment',
  iconSrc: getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.JAVASCRIPT),
  isError: true,
  renderActions: () => (
    <>
      <ErrorTriangleIcon size={20} />
      <Checkbox />
    </>
  ),
  onClick: () => {},
}
