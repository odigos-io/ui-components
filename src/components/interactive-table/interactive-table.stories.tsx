import React from 'react'
import { Text } from '../text'
import { Status } from '../status'
import Theme from '@odigos/ui-theme'
import { Tooltip } from '../tooltip'
import { FlexRow } from '../../styled'
import { Checkbox } from '../checkbox'
import { IconGroup } from '../icon-group'
import { IconButton } from '../icon-button'
import { IconWrapped } from '../icon-wrapped'
import { MonitorsIcons } from '../monitors-icons'
import { StoryObj, type StoryFn } from '@storybook/react'
import { CopyIcon, ErrorTriangleIcon, KeyIcon } from '@odigos/ui-icons'
import { InteractiveTable, RowCell, type InteractiveTableProps } from '.'
import {
  DISPLAY_TITLES,
  ENTITY_TYPES,
  formatBytes,
  getActionIcon,
  getConditionsBooleans,
  getContainersIcons,
  getContainersInstrumentedCount,
  getEntityLabel,
  getMetricForEntity,
  getPlatformIcon,
  getStatusIcon,
  isOverTime,
  mapConditions,
  MOCK_ACTIONS,
  MOCK_SOURCES,
  MOCK_TOKENS,
  NOTIFICATION_TYPE,
  PLATFORM_TYPE,
  useCopy,
  useTimeAgo,
} from '@odigos/ui-utils'

export default {
  title: 'Components/InteractiveTable',
  component: InteractiveTable,
}

// Create a master template for mapping props to render
const Template: StoryFn<InteractiveTableProps> = (props) => {
  return <InteractiveTable {...props} />
}

export const Tokens: StoryObj<InteractiveTableProps> = Template.bind({})

Tokens.args = {
  columns: [
    { key: 'icon', title: '' },
    { key: 'name', title: 'Audience also known as Name' },
    { key: 'expires_at', title: 'Expires' },
    { key: 'token', title: 'Token' },
    { key: 'actions', title: '' },
  ],
  rows: MOCK_TOKENS.map(({ token, name, expiresAt }, idx) => ({
    cells: [
      { columnKey: 'icon', icon: KeyIcon },
      { columnKey: 'name', value: name },
      { columnKey: 'token', value: `${new Array(15).fill('•').join('')}` },
      {
        columnKey: 'expires_at',
        component: () => {
          const theme = Theme.useTheme()

          return (
            <Text
              size={14}
              color={isOverTime(expiresAt, 0) ? theme.text.error : isOverTime(expiresAt, 604800000) ? theme.text.warning : theme.text.success}
            >
              {useTimeAgo().format(expiresAt)} ({new Date(expiresAt).toDateString().split(' ').slice(1).join(' ')})
            </Text>
          )
        },
      },
      {
        columnKey: 'actions',
        component: () => {
          const theme = Theme.useTheme()
          const { isCopied, copiedIndex, clickCopy } = useCopy()
          const SuccessIcon = getStatusIcon(NOTIFICATION_TYPE.SUCCESS, theme)

          return (
            <FlexRow $gap={0}>
              <IconButton size={32} onClick={() => clickCopy(token, idx)}>
                {isCopied && copiedIndex === idx ? <SuccessIcon /> : <CopyIcon />}
              </IconButton>
            </FlexRow>
          )
        },
      },
    ],
  })),
  onRowClick: (row) => alert(`Row clicked: ${JSON.stringify(row)}`),
}

export const ComputePlatforms: StoryObj<InteractiveTableProps> = Template.bind({})

ComputePlatforms.args = {
  columns: [
    { key: 'icon', title: '' },
    { key: 'name', title: 'Name', sortable: true },
    { key: 'type', title: 'Type' },
    { key: 'status', title: 'Status' },
    { key: 'sources', title: 'Sources' },
    { key: 'actions', title: 'Actions', sortable: true },
    { key: 'destinations', title: 'Destinations', sortable: true },
    { key: 'api_tokens', title: 'API Tokens', sortable: true },
  ],
  rows: [
    {
      id: 'My_new_kubernates_cluster',
      type: PLATFORM_TYPE.K8S,
      connectionStatus: NOTIFICATION_TYPE.SUCCESS,
      sources: 24,
      sourcesInstrumented: 12,
      actions: 2,
      destinations: 12,
      apiTokens: 1,
    },
    {
      id: 'Alon-org121',
      type: PLATFORM_TYPE.VM,
      connectionStatus: NOTIFICATION_TYPE.ERROR,
      sources: 12,
      sourcesInstrumented: 8,
      actions: 12,
      destinations: 23,
      apiTokens: 3,
    },
    {
      id: 'Amir-playground',
      type: PLATFORM_TYPE.K8S,
      connectionStatus: NOTIFICATION_TYPE.ERROR,
      sources: 8,
      sourcesInstrumented: 4,
      actions: '-',
      destinations: 40,
      apiTokens: 1,
    },
    {
      id: 'Lang-test',
      type: PLATFORM_TYPE.K8S,
      connectionStatus: NOTIFICATION_TYPE.ERROR,
      sources: 64,
      sourcesInstrumented: 45,
      actions: '-',
      destinations: 5,
      apiTokens: 1,
    },
    {
      id: 'Szymon_cluster_123',
      type: PLATFORM_TYPE.VM,
      connectionStatus: NOTIFICATION_TYPE.ERROR,
      sources: 120,
      sourcesInstrumented: 120,
      actions: 3,
      destinations: 1,
      apiTokens: 2,
    },
  ].map(({ id, type, connectionStatus, sources, sourcesInstrumented, actions, destinations, apiTokens }) => ({
    status: connectionStatus,
    cells: [
      { columnKey: 'icon', icon: getPlatformIcon(type) },
      { columnKey: 'name', value: id },
      { columnKey: 'type', value: type, textColor: '#b5b5b5' },
      { columnKey: 'sources', value: `${sourcesInstrumented}/${sources} instrumented` },
      { columnKey: 'actions', value: actions },
      { columnKey: 'destinations', value: destinations },
      { columnKey: 'api_tokens', value: apiTokens },
      {
        columnKey: 'status',
        component: () => (
          <div style={{ lineHeight: 1 }}>
            <Status
              title={connectionStatus === NOTIFICATION_TYPE.SUCCESS ? 'connection alive' : 'connection lost'}
              status={connectionStatus}
              withIcon
              withBorder
            />
          </div>
        ),
      },
    ],
  })),
  onRowClick: (row) => alert(`Row clicked: ${JSON.stringify(row)}`),
}

export const Sources: StoryObj<InteractiveTableProps> = Template.bind({})

Sources.args = {
  columns: [
    { key: 'checkbox-and-icon', title: '' },
    { key: 'name', title: DISPLAY_TITLES.NAME, sortable: true },
    { key: 'type', title: 'Kubernetes Type', sortable: true },
    { key: 'namespace', title: DISPLAY_TITLES.NAMESPACE, sortable: true },
    { key: 'containers', title: DISPLAY_TITLES.DETECTED_CONTAINERS },
    { key: 'conditions', title: 'Conditions' },
    { key: 'throughput', title: 'Throughput', sortable: true },
  ],
  rows: MOCK_SOURCES.map((source) => {
    const id = { namespace: source.namespace, name: source.name, kind: source.kind }
    const { hasErrors, hasWarnings, hasDisableds } = getConditionsBooleans(source.conditions || [])

    return {
      status: hasErrors ? NOTIFICATION_TYPE.ERROR : hasWarnings ? NOTIFICATION_TYPE.WARNING : undefined,
      faded: hasDisableds,
      cells: [
        {
          columnKey: 'checkbox-and-icon',
          component: () => (
            <FlexRow $gap={16}>
              <Checkbox />
              <IconGroup iconSrcs={getContainersIcons(source.containers)} />
            </FlexRow>
          ),
        },
        {
          columnKey: 'name',
          value: getEntityLabel(source, ENTITY_TYPES.SOURCE, { extended: true }),
        },
        {
          columnKey: 'type',
          value: source.kind,
        },
        {
          columnKey: 'namespace',
          value: source.namespace,
        },
        {
          columnKey: 'throughput',
          value: formatBytes(getMetricForEntity({ sources: [], destinations: [] }, ENTITY_TYPES.SOURCE, id).throughput),
        },
        {
          columnKey: 'conditions',
          // component: () => <TableCellConditions conditions={source.conditions || []} />,
        },
        {
          columnKey: 'containers',
          component: () => (
            <div style={{ lineHeight: 1 }}>
              <Status status={NOTIFICATION_TYPE.INFO} title={getContainersInstrumentedCount(source.containers)} withBorder />
            </div>
          ),
        },
      ] as RowCell[],
    }
  }),
  onRowClick: (row) => alert(`Row clicked: ${JSON.stringify(row)}`),
}

export const Actions: StoryObj<InteractiveTableProps> = Template.bind({})

Actions.args = {
  columns: [
    { key: 'icon', title: '' },
    { key: 'name', title: 'Name' },
    { key: 'type', title: 'Type' },
    { key: 'signals', title: 'Monitoring' },
    { key: 'active-status', title: 'Status' },
    { key: 'conditions', title: 'Conditions' },
    { key: 'notes', title: 'Notes' },
  ],
  rows: MOCK_ACTIONS.map((act, i) => {
    const errors = act.conditions?.filter(({ status }) => status === NOTIFICATION_TYPE.ERROR) || []

    return {
      status: errors.length ? NOTIFICATION_TYPE.ERROR : undefined,
      cells: [
        {
          columnKey: 'icon',
          component: () => <IconWrapped icon={getActionIcon(act.type)} />,
        },
        { columnKey: 'name', value: getEntityLabel(act, ENTITY_TYPES.ACTION, { prioritizeDisplayName: true }) },
        { columnKey: 'type', value: act.type, textColor: '#b5b5b5' },
        { columnKey: 'notes', value: [3, 5, 6].includes(i) ? '' : act.spec.notes, textColor: '#b5b5b5' },
        {
          columnKey: 'signals',
          component: () => <MonitorsIcons withLabels monitors={act.spec.signals} />,
        },
        {
          columnKey: 'active-status',
          component: () => (
            <div style={{ lineHeight: 1 }}>
              <Status
                status={act.spec.disabled ? NOTIFICATION_TYPE.ERROR : NOTIFICATION_TYPE.SUCCESS}
                title={act.spec.disabled ? 'Inactive' : 'Active'}
                withIcon
                withBorder
              />
            </div>
          ),
        },
        {
          columnKey: 'conditions',
          component: () => (
            <div style={{ lineHeight: 1 }}>
              {!!errors.length ? (
                <FlexRow>
                  {mapConditions(errors).map(({ type, reason, message, lastTransitionTime }) => (
                    <Tooltip
                      key={`${act.id}-${type}-${lastTransitionTime}`}
                      titleIcon={ErrorTriangleIcon}
                      title={type}
                      text={message || reason || ''}
                      timestamp={lastTransitionTime}
                    >
                      <Status status={NOTIFICATION_TYPE.ERROR} title={type} withBorder withIcon />
                    </Tooltip>
                  ))}
                </FlexRow>
              ) : (
                <Status status={NOTIFICATION_TYPE.SUCCESS} title='success' withBorder withIcon />
              )}
            </div>
          ),
        },
      ] as RowCell[],
    }
  }),
  onRowClick: (row) => alert(`Row clicked: ${JSON.stringify(row)}`),
}
