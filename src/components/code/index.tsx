import React, { type FC, Fragment, type HTMLAttributes, useId } from 'react'
import { Text } from '../text'
import { Tooltip } from '../tooltip'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { FlexRow } from '../../styled'
import { Highlight, themes as prismThemes, type Token } from 'prism-react-renderer'
import { flattenObjectKeys, getStatusIcon, NOTIFICATION_TYPE, removeEmptyValuesFromObject, safeJsonParse, safeJsonStringify } from '@odigos/ui-utils'

interface CodeProps {
  language: string
  code: string
  flatten?: boolean
  pretty?: boolean
}

const Table = styled.table`
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.font_family.primary};
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  td:first-child {
    padding-left: 0 !important;
  }
  td:last-child {
    padding-right: 0 !important;
  }
`

const TableData = styled.td`
  vertical-align: top;
  padding: 4px 6px;
`

const Title = styled(Text)`
  white-space: nowrap;
`

const CodeLineToken = styled.span<{ $noWrap?: boolean }>`
  white-space: ${({ $noWrap }) => ($noWrap ? 'nowrap' : 'pre-wrap')};
  overflow-wrap: break-word;
  font-size: 12px;
`

const Code: FC<CodeProps> = ({ language, code, flatten, pretty }) => {
  const { darkMode } = Theme.useDarkMode()

  let str = ''

  if (language === 'json') {
    const obj = safeJsonParse(code, {})
    const objNoNull = removeEmptyValuesFromObject(obj)

    if (flatten) str = safeJsonStringify(flattenObjectKeys(objNoNull))
    else str = safeJsonStringify(objNoNull)
  } else {
    str = code
  }

  if (pretty && language === 'json') {
    return <PrettyJsonCode darkMode={darkMode} str={str} />
  }

  return (
    <Highlight theme={darkMode ? prismThemes.palenight : prismThemes.vsLight} language={language} code={str}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <pre>
          {tokens.map((line, i) => (
            <div key={`line-${i}`} {...getLineProps({ line })}>
              {line.map((token, ii) => (
                <CodeLineToken key={`line-${i}-token-${ii}`} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

const formatLineForPrettyMode = (line: Token[]) => {
  const ignoreTypes = ['punctuation', 'plain', 'operator']

  return line
    .filter((token) => !ignoreTypes.includes(token.types[0]))
    .map(({ types, content }) => {
      const updatedTypes = [...types]
      const updatedContent = ['property', 'string'].includes(updatedTypes[0]) ? content.replace(/"/g, '') : content

      // override types for prettier colors
      if (updatedTypes[0] === 'string') {
        if (['true', 'false'].includes(updatedContent.split('@')[0])) updatedTypes[0] = 'boolean'
        if (updatedContent.split('@')[0].match(/^[0-9]+$/)) updatedTypes[0] = 'number'
      }

      return {
        types: updatedTypes,
        content: updatedContent,
      }
    })
}

const getComponentsFromPropertyString = (propertyString: string, theme: any) => {
  const [text, ...rest] = propertyString.split('@')
  const components =
    rest
      ?.map((c) => {
        if (!c.includes('=')) return null
        const [type, value] = c.split('=')

        switch (type) {
          case 'tooltip':
            return <Tooltip key={useId()} withIcon text={value} />
          case 'status':
            if (value === 'none') return <div key={useId()} style={{ width: 16, height: 16 }} />
            let Icon = getStatusIcon(value as NOTIFICATION_TYPE, theme)
            if (!Icon) Icon = getStatusIcon(NOTIFICATION_TYPE.WARNING, theme)
            return <Icon key={useId()} />
          default:
            console.warn('unexpected component type!', type)
            return null
        }
      })
      ?.filter((c) => !!c) || []

  return { text, components }
}

const PrettyJsonCode: FC<{ darkMode: boolean; str: string }> = ({ darkMode, str }) => {
  const theme = Theme.useTheme()

  const renderEmptyRows = (count: number = 2) => {
    const rows = new Array(count).fill((props: HTMLAttributes<HTMLTableRowElement>) => (
      <TableRow {...props}>
        <TableData />
        <TableData />
      </TableRow>
    ))

    return (
      <Fragment>
        {rows.map((R, i) => (
          <R key={useId()} style={i === 0 ? { borderBottom: `1px solid ${theme.colors.border}` } : {}} />
        ))}
      </Fragment>
    )
  }

  return (
    <Highlight theme={darkMode ? prismThemes.palenight : prismThemes.vsLight} language='json' code={str}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <Table>
          <TableBody>
            {tokens.map((line, i) => {
              const formattedLine = formatLineForPrettyMode(line)
              const lineProps = getLineProps({ line: formattedLine })

              if (formattedLine.length === 1 && formattedLine[0].types[0] === 'property') {
                return (
                  <Fragment key={`line-${i}`}>
                    {renderEmptyRows()}
                    <TableRow {...lineProps}>
                      <TableData>
                        <Title>{formattedLine[0].content}</Title>
                      </TableData>
                      <TableData />
                    </TableRow>
                  </Fragment>
                )
              } else if (formattedLine.length === 2) {
                return (
                  <TableRow key={`line-${i}`} {...lineProps}>
                    {formattedLine.map((token, ii) => {
                      const { text, components } = getComponentsFromPropertyString(token.content, theme)
                      const isRowTitle = ii === 0

                      return (
                        <TableData key={`line-${i}-token-${ii}`}>
                          <FlexRow>
                            <FlexRow>{components}</FlexRow>
                            <CodeLineToken $noWrap={isRowTitle}>{text}</CodeLineToken>
                          </FlexRow>
                        </TableData>
                      )
                    })}
                  </TableRow>
                )
              } else {
                if (!!formattedLine.length) console.warn('this line is unexpected!', i, formattedLine)
                return null
              }
            })}
          </TableBody>
        </Table>
      )}
    </Highlight>
  )
}

export { Code, type CodeProps }
export * from './toggle-code-component/index'
