import React from 'react'
import { DataTab, type DataTabProps } from '.'
import { type StoryFn } from '@storybook/react'
import { ErrorTriangleIcon } from '@odigos/ui-icons'
import { getProgrammingLanguageIcon, NOTIFICATION_TYPE, PROGRAMMING_LANGUAGES } from '@odigos/ui-utils'

export default {
  title: 'Components/DataTab',
  component: DataTab,
}

export const Default: StoryFn<DataTabProps> = (props) => {
  return <DataTab {...props} />
}

Default.args = {
  title: 'auth-service-v69',
  subTitle: 'default • deployment',
  iconSrcs: [
    getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.GO),
    getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.PYTHON),
    getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.JAVASCRIPT),
    getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.JAVA),
    getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.DOTNET),
    getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.NGINX),
    getProgrammingLanguageIcon(PROGRAMMING_LANGUAGES.MYSQL),
  ],
  withCheckbox: true,
  status: NOTIFICATION_TYPE.ERROR,
  renderActions: () => <ErrorTriangleIcon size={20} />,
  onClick: () => {},
}
