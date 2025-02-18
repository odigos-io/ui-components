import React, { Fragment, useState } from 'react'
import type { StoryFn } from '@storybook/react'
import { Code, type CodeProps, ToggleCodeComponent } from '.'
import { MOCK_DESCRIBE_ODIGOS, safeJsonStringify } from '@odigos/ui-utils'

export default {
  title: 'Components/Code',
  component: Code,
}

export const Default: StoryFn<CodeProps> = (props) => {
  const [val, setVal] = useState(false)

  return (
    <Fragment>
      <ToggleCodeComponent isPrettyMode={val} setIsPrettyMode={setVal} />
      <Code pretty={val} {...props} />
    </Fragment>
  )
}

Default.args = {
  language: 'json',
  flatten: false,
  code: safeJsonStringify(MOCK_DESCRIBE_ODIGOS),
}
