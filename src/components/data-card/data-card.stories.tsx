import React from 'react'
import { Status } from '../status'
import { StoryObj, type StoryFn } from '@storybook/react'
import { DATA_CARD_FIELD_TYPES, DataCard, type DataCardProps } from '.'
import { MOCK_DESCRIBE_SOURCE, NOTIFICATION_TYPE, PROGRAMMING_LANGUAGES } from '@odigos/ui-utils'

export default {
  title: 'Components/DataCard',
  component: DataCard,
}

// Create a master template for mapping props to render
const Template: StoryFn<DataCardProps> = (props) => {
  return <DataCard {...props} />
}

export const Containers: StoryObj<DataCardProps> = Template.bind({})

Containers.args = {
  title: 'Detected Containers',
  titleBadge: 5,
  description: 'The system automatically instruments the containers it detects with a supported programming language.',
  data: [
    {
      type: DATA_CARD_FIELD_TYPES.SOURCE_CONTAINER,
      value: JSON.stringify({
        containerName: 'go app',
        language: PROGRAMMING_LANGUAGES.GO,
        instrumented: true,
        instrumentationMessage: '',
        otelDistroName: 'golang-community',
        runtimeVersion: '1.23.0',
      }),
    },
    {
      type: DATA_CARD_FIELD_TYPES.SOURCE_CONTAINER,
      value: JSON.stringify({
        containerName: 'nginx app',
        language: PROGRAMMING_LANGUAGES.NGINX,
        instrumented: false,
        instrumentationMessage: 'UnsupportedProgrammingLanguage',
        otelDistroName: '',
        runtimeVersion: '',
      }),
    },
    {
      type: DATA_CARD_FIELD_TYPES.SOURCE_CONTAINER,
      value: JSON.stringify({
        containerName: 'postgres app',
        language: PROGRAMMING_LANGUAGES.POSTGRES,
        instrumented: false,
        instrumentationMessage: 'UnsupportedProgrammingLanguage',
        otelDistroName: '',
        runtimeVersion: '',
      }),
    },
    {
      type: DATA_CARD_FIELD_TYPES.SOURCE_CONTAINER,
      value: JSON.stringify({
        containerName: 'redis app',
        language: PROGRAMMING_LANGUAGES.REDIS,
        instrumented: false,
        instrumentationMessage: 'UnsupportedProgrammingLanguage',
        otelDistroName: '',
        runtimeVersion: '',
      }),
    },
    {
      type: DATA_CARD_FIELD_TYPES.SOURCE_CONTAINER,
      value: JSON.stringify({
        containerName: 'c++ app',
        language: PROGRAMMING_LANGUAGES.CPLUSPLUS,
        instrumented: false,
        instrumentationMessage: 'UnsupportedProgrammingLanguage',
        otelDistroName: '',
        runtimeVersion: '',
      }),
    },
    {
      type: DATA_CARD_FIELD_TYPES.LOADER,
    },
  ],
}

export const DescribePod: StoryObj<DataCardProps> = Template.bind({})

const describeSource = {
  ...MOCK_DESCRIBE_SOURCE,
  pods: [
    {
      ...MOCK_DESCRIBE_SOURCE.pods[0],
      containers: MOCK_DESCRIBE_SOURCE.pods[0].containers.concat(
        MOCK_DESCRIBE_SOURCE.pods[0].containers.map((container) => ({
          ...container,
          instrumentationInstances: container.instrumentationInstances.map((instance) => ({
            ...instance,
            healthy: { ...instance.healthy, value: 'false', status: NOTIFICATION_TYPE.ERROR },
          })),
        }))
      ),
    },
  ],
}

const podWithErrors =
  describeSource.pods[0].phase.status !== NOTIFICATION_TYPE.SUCCESS ||
  !!describeSource.pods[0].containers.find(
    ({ instrumentationInstances }) => !!instrumentationInstances.find(({ healthy }) => healthy.status !== NOTIFICATION_TYPE.SUCCESS)
  )

DescribePod.args = {
  title: `Pod: ${describeSource.pods[0].podName.value}`,
  action: () => (
    <Status
      status={podWithErrors ? NOTIFICATION_TYPE.ERROR : NOTIFICATION_TYPE.SUCCESS}
      title={podWithErrors ? NOTIFICATION_TYPE.ERROR : NOTIFICATION_TYPE.SUCCESS}
      withIcon
      withBorder
    />
  ),
  withExtend: true,
  data: [
    {
      type: DATA_CARD_FIELD_TYPES.COPY_TEXT,
      value: `kubectl get pod ${describeSource.pods[0].podName.value} -n ${describeSource.namespace.value}`,
    },
    {
      type: DATA_CARD_FIELD_TYPES.DIVIDER,
    },
    {
      type: DATA_CARD_FIELD_TYPES.DESCRIBE_ROW,
      value: JSON.stringify({
        title: describeSource.pods[0].nodeName.name,
        tooltip: describeSource.pods[0].nodeName.explain,
        value: {
          text: describeSource.pods[0].nodeName.value,
          status: undefined,
        },
      }),
    },
    {
      type: DATA_CARD_FIELD_TYPES.DIVIDER,
    },
    {
      type: DATA_CARD_FIELD_TYPES.DESCRIBE_ROW,
      value: JSON.stringify({
        title: describeSource.pods[0].phase.name,
        tooltip: describeSource.pods[0].phase.explain,
        value: {
          text: describeSource.pods[0].phase.value,
          status: describeSource.pods[0].phase.status,
        },
      }),
    },
    {
      type: DATA_CARD_FIELD_TYPES.DIVIDER,
    },
    ...describeSource.pods[0].containers.map((container) => {
      return {
        type: DATA_CARD_FIELD_TYPES.POD_CONTAINER,
        value: JSON.stringify({
          containerName: container.containerName.value,
          actualDevice: {
            title: container.actualDevices.name,
            subTitle: container.actualDevices.value,
            tooltip: container.actualDevices.explain,
          },
          processes: container.instrumentationInstances.map((instance) => ({
            health: instance.healthy.status,
            message: instance.message?.value || '',
            identifyingAttributes: instance.identifyingAttributes || [],
          })),
        }),
      } as DataCardProps['data'][0]
    }),
  ] as DataCardProps['data'],
}
