import React, { useId, type FC } from 'react'
import { Text } from '../../text'
import { Code } from '../../code'
import { Badge } from '../../badge'
import Theme from '@odigos/ui-theme'
import { Status } from '../../status'
import styled from 'styled-components'
import { Tooltip } from '../../tooltip'
import { Divider } from '../../divider'
import { DataTab } from '../../data-tab'
import { FadeLoader } from '../../fade-loader'
import { IconButton } from '../../icon-button'
import { DescribeRow } from '../../describe-row'
import { MonitorsIcons } from '../../monitors-icons'
import { CheckIcon, CopyIcon } from '@odigos/ui-icons'
import { CenterThis, FlexColumn, FlexRow } from '../../../styled'
import { InteractiveTable, RowCell } from '../../interactive-table'
import {
  capitalizeFirstLetter,
  getProgrammingLanguageIcon,
  NOTIFICATION_TYPE,
  parseJsonStringToPrettyString,
  PROGRAMMING_LANGUAGES,
  safeJsonParse,
  splitCamelString,
  useCopy,
} from '@odigos/ui-utils'

enum DATA_CARD_FIELD_TYPES {
  CODE = 'code',
  TABLE = 'table',
  BADGE = 'badge',
  LOADER = 'loader',
  DIVIDER = 'divider',
  MONITORS = 'monitors',
  COPY_TEXT = 'copy-text',
  DESCRIBE_ROW = 'describe-row',
  ACTIVE_STATUS = 'active-status',
  POD_CONTAINER = 'pod-container',
  SOURCE_CONTAINER = 'source-container',
}

interface DataCardFieldsProps {
  data: {
    type?: DATA_CARD_FIELD_TYPES
    title?: string
    tooltip?: string
    value?: string | Record<string, any>
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

const FlexColStretched = styled(FlexColumn)`
  width: 100%;
`

const CopyWrapper = styled(FlexRow)`
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary + Theme.opacity.hex['010']};
  pre {
    color: ${({ theme }) => theme.text.default};
    font-size: 12px;
  }
`

const DataCardFields: FC<DataCardFieldsProps> = ({ data }) => {
  return (
    <ListContainer>
      {data.map(({ type, title, tooltip, value }, idx) => (
        <ListItem
          key={`data-field-${title || (!!value ? JSON.stringify(value) : idx)}`}
          $width={
            !!type && [DATA_CARD_FIELD_TYPES.CODE, DATA_CARD_FIELD_TYPES.TABLE].includes(type)
              ? 'inherit'
              : !!type &&
                [
                  DATA_CARD_FIELD_TYPES.LOADER,
                  DATA_CARD_FIELD_TYPES.DIVIDER,
                  DATA_CARD_FIELD_TYPES.COPY_TEXT,
                  DATA_CARD_FIELD_TYPES.DESCRIBE_ROW,
                  DATA_CARD_FIELD_TYPES.POD_CONTAINER,
                  DATA_CARD_FIELD_TYPES.SOURCE_CONTAINER,
                ].includes(type)
              ? '100%'
              : 'unset'
          }
        >
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
  const { clickCopy, isCopied } = useCopy()

  switch (type) {
    case DATA_CARD_FIELD_TYPES.DIVIDER: {
      return <Divider length='100%' margin='0' />
    }

    case DATA_CARD_FIELD_TYPES.LOADER: {
      return (
        <CenterThis>
          <FadeLoader scale={1.2} />
        </CenterThis>
      )
    }

    case DATA_CARD_FIELD_TYPES.MONITORS: {
      return <MonitorsIcons monitors={value?.split(', ') || []} withLabels color={theme.colors.secondary} />
    }

    case DATA_CARD_FIELD_TYPES.BADGE: {
      const params = safeJsonParse(value, { label: '-', filled: false })

      return <Badge {...params} />
    }

    case DATA_CARD_FIELD_TYPES.CODE: {
      const params = safeJsonParse(value, { language: '', code: '' })

      return <Code {...params} />
    }

    case DATA_CARD_FIELD_TYPES.DESCRIBE_ROW: {
      const params = safeJsonParse(value, { title: '', subTitle: '', tooltip: '', value: { text: undefined, status: undefined } })

      return <DescribeRow {...params} />
    }

    case DATA_CARD_FIELD_TYPES.TABLE: {
      const params = safeJsonParse(value, {
        columns: [],
        rows: [{ status: undefined, cells: [] as RowCell[] }],
      })

      return <InteractiveTable {...params} />
    }

    case DATA_CARD_FIELD_TYPES.ACTIVE_STATUS: {
      return (
        <Status
          status={value == 'true' ? NOTIFICATION_TYPE.SUCCESS : NOTIFICATION_TYPE.ERROR}
          title={value == 'true' ? 'Active' : 'Inactive'}
          size={10}
          withIcon
          withBorder
        />
      )
    }

    case DATA_CARD_FIELD_TYPES.COPY_TEXT: {
      const str = typeof value === 'string' ? value : JSON.stringify(value)

      return (
        <CopyWrapper>
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              clickCopy(str)
            }}
            tooltip={isCopied ? 'Copied!' : 'Copy'}
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </IconButton>
          <pre>{str}</pre>
        </CopyWrapper>
      )
    }

    case DATA_CARD_FIELD_TYPES.POD_CONTAINER: {
      const { containerName, actualDevice, processes } = safeJsonParse(value, {
        containerName: '',
        actualDevice: { title: '', subTitle: '', tooltip: '' },
        processes: [{ health: NOTIFICATION_TYPE.INFO, message: '', identifyingAttributes: [] }],
      })

      return (
        <DataTab
          title={containerName}
          subTitle={`${processes.length} Processes`}
          renderActions={() => {
            return (
              <Status
                status={NOTIFICATION_TYPE.INFO}
                title='Instrumentation Device'
                subtitle={!actualDevice.subTitle || actualDevice.subTitle === '[]' ? 'none' : actualDevice.subTitle}
                withBorder
              />
            )
          }}
          isExtended={!!processes.length}
          renderExtended={() => {
            return (
              <FlexColStretched $gap={24}>
                {processes.map((process, idx) => (
                  <FlexColStretched key={`process-${idx}`} $gap={8}>
                    <DescribeRow
                      title={`Process #${idx + 1}`}
                      subTitle={process.message || ''}
                      value={{
                        text: process.health === NOTIFICATION_TYPE.SUCCESS ? 'healthy' : 'unhealthy',
                        status: process.health,
                      }}
                    />

                    {process.identifyingAttributes.map(({ name, value }) => (
                      <DescribeRow key={useId()} title={name} subTitle='' value={{ text: value, status: undefined }} />
                    ))}
                  </FlexColStretched>
                ))}
              </FlexColStretched>
            )
          }}
        />
      )
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
      return <PreWrap>{parseJsonStringToPrettyString(typeof value === 'string' ? value || '-' : '')}</PreWrap>
    }
  }
}

export { DataCardFields, type DataCardFieldsProps, DATA_CARD_FIELD_TYPES }
