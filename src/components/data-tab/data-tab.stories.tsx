import React from 'react'
import { Checkbox } from '../..'
import { DataTab, type DataTabProps } from '.'
import { type StoryFn } from '@storybook/react'
import { ErrorTriangleIcon } from '@odigos/ui-icons'
import { getProgrammingLanguageIcon, PROGRAMMING_LANGUAGES } from '@odigos/ui-utils'

export default {
  title: 'Components/DataTab',
  component: DataTab,
}

export const Default: StoryFn<DataTabProps> = (props) => {
  return <DataTab {...props} />
}

Default.args = {
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
