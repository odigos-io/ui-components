import React, { Fragment, type FC } from 'react'
import { Text } from '../../text'
import { Code } from '../../code'
import { Status } from '../../status'
import { Tooltip } from '../../tooltip'
import { Divider } from '../../divider'
import { DataTab } from '../../data-tab'
import styled, { useTheme } from 'styled-components'
import { MonitorsIcons } from '../../monitors-icons'
import { NotificationNote } from '../../notification-note'
import { InteractiveTable } from '../../interactive-table'
import {
  capitalizeFirstLetter,
  getProgrammingLanguageIcon,
  NOTIFICATION_TYPE,
  parseJsonStringToPrettyString,
  PROGRAMMING_LANGUAGES,
  safeJsonParse,
} from '@odigos/ui-utils'

enum DATA_CARD_FIELD_TYPES {
  DIVIDER = 'divider',
  MONITORS = 'monitors',
  ACTIVE_STATUS = 'active-status',
  SOURCE_CONTAINER = 'source-container',
  CODE = 'code',
  TABLE = 'table',
}

interface DataCardFieldsProps {
  data: {
    type?: DATA_CARD_FIELD_TYPES
    title?: string
    tooltip?: string
    value?: string | Record<string, any>
    width?: string
  }[]
}

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
  width: 100%;
`

const ListItem = styled.div<{ $width: string }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: ${({ $width }) => $width};
`

const ItemTitle = styled(Text)`
  color: ${({ theme }) => theme.text.grey};
  font-size: 10px;
  line-height: 16px;
`

const DataCardFields: FC<DataCardFieldsProps> = ({ data }) => {
  return (
    <ListContainer>
      {data.map(({ type, title, tooltip, value, width = 'unset' }) => (
        <ListItem key={`data-field-${title || value}`} $width={width}>
          <Tooltip text={tooltip} withIcon>
            {!!title && <ItemTitle>{title}</ItemTitle>}
          </Tooltip>
          {renderValue(type, value)}
        </ListItem>
      ))}
    </ListContainer>
  )
}

const PreWrap = styled(Text)`
  font-size: 12px;
  white-space: pre-wrap;
`

// We need to maintain this with new components every time we add a new type to "DATA_CARD_FIELD_TYPES"
const renderValue = (type: DataCardFieldsProps['data'][0]['type'], value: DataCardFieldsProps['data'][0]['value']) => {
  const theme = useTheme()

  switch (type) {
    case DATA_CARD_FIELD_TYPES.DIVIDER:
      return <Divider length='100%' margin='0' />

    case DATA_CARD_FIELD_TYPES.MONITORS:
      return <MonitorsIcons monitors={value?.split(', ') || []} withLabels color={theme.colors.secondary} />

    case DATA_CARD_FIELD_TYPES.ACTIVE_STATUS:
      return (
        <Status
          status={value == 'true' ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.ERROR}
          title={value == 'true' ? 'Active' : 'Inactive'}
          size={10}
          withIcon
          withBorder
        />
      )

    case DATA_CARD_FIELD_TYPES.CODE: {
      const params = safeJsonParse(value, { language: '', code: '' })

      return <Code {...params} />
    }

    case DATA_CARD_FIELD_TYPES.TABLE: {
      const params = safeJsonParse(value, { columns: [], rows: [] })

      return <InteractiveTable {...params} />
    }

    case DATA_CARD_FIELD_TYPES.SOURCE_CONTAINER: {
      const { containerName, language, runtimeVersion, instrumented, instrumentationMessage, otelDistroName, otherAgent, hasPresenceOfOtherAgent } =
        safeJsonParse(value, {
          containerName: '',
          language: PROGRAMMING_LANGUAGES.UNKNOWN,
          runtimeVersion: '',
          instrumented: false,
          instrumentationMessage: '',
          otelDistroName: '',
          otherAgent: null,
          hasPresenceOfOtherAgent: false,
        })

      const awaitingInstrumentation = !instrumented && !instrumentationMessage
      const failedInstrumentation = !instrumented && !!instrumentationMessage

      // Determine if running concurrently is possible based on language and other_agent
      const canRunInParallel = !hasPresenceOfOtherAgent && (language === PROGRAMMING_LANGUAGES.PYTHON || language === PROGRAMMING_LANGUAGES.JAVA)

      return (
        <DataTab
          title={containerName}
          subTitle={
            `${language === PROGRAMMING_LANGUAGES.JAVASCRIPT ? 'Node.js' : capitalizeFirstLetter(language)}` +
            (!!runtimeVersion ? ` • Runtime Version: ${runtimeVersion}` : '')
          }
          iconSrc={getProgrammingLanguageIcon(language)}
          isExtended={!!otherAgent || failedInstrumentation}
          renderExtended={() => (
            <Fragment>
              {failedInstrumentation && <NotificationNote type={NOTIFICATION_TYPE.INFO} message={instrumentationMessage} />}
              {!!otherAgent && (
                <NotificationNote
                  type={NOTIFICATION_TYPE.INFO}
                  message={
                    hasPresenceOfOtherAgent
                      ? `By default, we do not operate alongside the ${otherAgent}. Please contact the Odigos team for guidance on enabling this configuration.`
                      : canRunInParallel
                      ? `We are operating alongside the ${otherAgent}, which is not the recommended configuration. We suggest disabling the ${otherAgent} for optimal performance.`
                      : `Concurrent execution with the ${otherAgent} is not supported. Please disable one of the agents to enable proper instrumentation.`
                  }
                />
              )}
            </Fragment>
          )}
          renderActions={() => {
            return (
              <Status
                status={instrumented ? NOTIFICATION_TYPE.SUCCESS : awaitingInstrumentation ? NOTIFICATION_TYPE.WARNING : NOTIFICATION_TYPE.ERROR}
                title={instrumented ? 'Instrumented' : awaitingInstrumentation ? 'Instrumenting...' : 'Uninstrumented'}
                subtitle={otelDistroName}
                withIcon
                withBorder
              />
            )
          }}
        />
      )
    }

    default: {
      return <PreWrap>{parseJsonStringToPrettyString(typeof value === 'string' ? value || '-' : '-')}</PreWrap>
    }
  }
}

export { DataCardFields, type DataCardFieldsProps, DATA_CARD_FIELD_TYPES }
