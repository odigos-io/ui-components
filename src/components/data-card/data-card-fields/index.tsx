import React, { type FC } from 'react'
import { Text } from '../../text'
import { Code } from '../../code'
import Theme from '@odigos/ui-theme'
import { Status } from '../../status'
import styled from 'styled-components'
import { Tooltip } from '../../tooltip'
import { Divider } from '../../divider'
import { DataTab } from '../../data-tab'
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
  splitCamelString,
} from '@odigos/ui-utils'
import { FlexRow } from '../../../styled'

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

const PreWrap = styled(Text)`
  font-size: 12px;
  white-space: pre-wrap;
`

const AlignCenter = styled(FlexRow)`
  width: 100%;
  justify-content: center;
`

const DataCardFields: FC<DataCardFieldsProps> = ({ data }) => {
  return (
    <ListContainer>
      {data.map(({ type, title, tooltip, value, width = 'unset' }, idx) => (
        <ListItem key={`data-field-${title || (!!value ? JSON.stringify(value) : idx)}`} $width={width}>
          <Tooltip text={tooltip} withIcon>
            {!!title && <ItemTitle>{title}</ItemTitle>}
          </Tooltip>
          {renderValue(type, value)}
        </ListItem>
      ))}
    </ListContainer>
  )
}

// We need to maintain this with new components every time we add a new type to "DATA_CARD_FIELD_TYPES"
const renderValue = (type: DataCardFieldsProps['data'][0]['type'], value: DataCardFieldsProps['data'][0]['value']) => {
  const theme = Theme.useTheme()

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
      const { containerName, language, runtimeVersion, instrumented, instrumentationMessage, otelDistroName } = safeJsonParse(value, {
        containerName: '',
        language: PROGRAMMING_LANGUAGES.UNKNOWN,
        runtimeVersion: '',
        instrumented: false,
        instrumentationMessage: '',
        otelDistroName: '',
      })

      const awaitingInstrumentation = !instrumented && !instrumentationMessage

      return (
        <DataTab
          title={containerName}
          subTitle={
            `${language === PROGRAMMING_LANGUAGES.JAVASCRIPT ? 'Node.js' : capitalizeFirstLetter(language)}` +
            (!!runtimeVersion ? ` • Runtime Version: ${runtimeVersion}` : '')
          }
          iconSrc={getProgrammingLanguageIcon(language)}
          isExtended={!!instrumentationMessage}
          renderExtended={() => {
            if (!!instrumentationMessage) {
              return (
                <AlignCenter>
                  <Status status={NOTIFICATION_TYPE.INFO} title={splitCamelString(instrumentationMessage)} />
                </AlignCenter>
              )
            }

            return null
          }}
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
