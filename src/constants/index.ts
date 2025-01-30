import { getActionIcon, getInstrumentationRuleIcon } from '../functions'
import { ACTION_TYPE, type ActionOption, INSTRUMENTATION_RULE_TYPE, InstrumentationRuleOption, type MonitorsOption, SIGNAL_TYPE } from '../@types'

export const MONITORS_OPTIONS: MonitorsOption[] = [
  {
    id: SIGNAL_TYPE.LOGS,
    value: 'Logs',
  },
  {
    id: SIGNAL_TYPE.METRICS,
    value: 'Metrics',
  },
  {
    id: SIGNAL_TYPE.TRACES,
    value: 'Traces',
  },
]

export const ACTION_OPTIONS: ActionOption[] = [
  {
    id: 'attributes',
    label: 'Attributes',
    icon: getActionIcon('attributes'),
    items: [
      {
        id: 'add_cluster_info',
        type: ACTION_TYPE.ADD_CLUSTER_INFO,
        icon: getActionIcon(ACTION_TYPE.ADD_CLUSTER_INFO),
        label: 'Add Cluster Info',
        description: 'Add static cluster-scoped attributes to your data.',
        allowedSignals: [SIGNAL_TYPE.TRACES, SIGNAL_TYPE.METRICS, SIGNAL_TYPE.LOGS],
        docsEndpoint: '/pipeline/actions/attributes/addclusterinfo',
        docsDescription:
          'The “Add Cluster Info” Odigos Action can be used to add resource attributes to telemetry signals originated from the k8s cluster where the Odigos is running.',
      },
      {
        id: 'delete_attribute',
        type: ACTION_TYPE.DELETE_ATTRIBUTES,
        icon: getActionIcon(ACTION_TYPE.DELETE_ATTRIBUTES),
        label: 'Delete Attribute',
        description: 'Delete attributes from logs, metrics, and traces.',
        allowedSignals: [SIGNAL_TYPE.TRACES, SIGNAL_TYPE.METRICS, SIGNAL_TYPE.LOGS],
        docsEndpoint: '/pipeline/actions/attributes/deleteattribute',
        docsDescription: 'The “Delete Attribute” Odigos Action can be used to delete attributes from logs, metrics, and traces.',
      },
      {
        id: 'rename_attribute',
        type: ACTION_TYPE.RENAME_ATTRIBUTES,
        icon: getActionIcon(ACTION_TYPE.RENAME_ATTRIBUTES),
        label: 'Rename Attribute',
        description: 'Rename attributes in logs, metrics, and traces.',
        allowedSignals: [SIGNAL_TYPE.TRACES, SIGNAL_TYPE.METRICS, SIGNAL_TYPE.LOGS],
        docsEndpoint: '/pipeline/actions/attributes/renameattribute',
        docsDescription:
          'The “Rename Attribute” Odigos Action can be used to rename attributes from logs, metrics, and traces. Different instrumentations might use different attribute names for similar information. This action let’s you to consolidate the names across your cluster.',
      },
      {
        id: 'pii-masking',
        type: ACTION_TYPE.PII_MASKING,
        icon: getActionIcon(ACTION_TYPE.PII_MASKING),
        label: 'PII Masking',
        description: 'Mask PII data in your traces.',
        allowedSignals: [SIGNAL_TYPE.TRACES],
        docsEndpoint: '/pipeline/actions/attributes/piimasking',
        docsDescription: 'The “PII Masking” Odigos Action can be used to mask PII data from span attribute values.',
      },
    ],
  },
  {
    id: 'sampler',
    label: 'Samplers',
    icon: getActionIcon('sampler'),
    items: [
      {
        id: 'error-sampler',
        type: ACTION_TYPE.ERROR_SAMPLER,
        icon: getActionIcon('sampler'),
        label: 'Error Sampler',
        description: 'Sample errors based on percentage.',
        allowedSignals: [SIGNAL_TYPE.TRACES],
        docsEndpoint: '/pipeline/actions/sampling/errorsampler',
        docsDescription: 'The “Error Sampler” Odigos Action is a Global Action that supports error sampling by filtering out non-error traces.',
      },
      {
        id: 'latency-action',
        type: ACTION_TYPE.LATENCY_SAMPLER,
        icon: getActionIcon('sampler'),
        label: 'Latency Sampler',
        description: 'Add latency to your traces.',
        allowedSignals: [SIGNAL_TYPE.TRACES],
        docsEndpoint: '/pipeline/actions/sampling/latencysampler',
        docsDescription:
          'The “Latency Sampler” Odigos Action is an Endpoint Action that samples traces based on their duration for a specific service and endpoint (HTTP route) filter.',
      },
      {
        id: 'probabilistic-sampler',
        type: ACTION_TYPE.PROBABILISTIC_SAMPLER,
        icon: getActionIcon('sampler'),
        label: 'Probabilistic Sampler',
        description: 'Sample traces based on percentage.',
        allowedSignals: [SIGNAL_TYPE.TRACES],
        docsEndpoint: '/pipeline/actions/sampling/probabilisticsampler',
        docsDescription:
          'The “Probabilistic Sampler” Odigos Action supports probabilistic sampling based on a configured sampling percentage applied to the TraceID.',
      },
    ],
  },
]

export const INSTRUMENTATION_RULE_OPTIONS: InstrumentationRuleOption[] = [
  {
    id: 'payload_collection',
    type: INSTRUMENTATION_RULE_TYPE.PAYLOAD_COLLECTION,
    icon: getInstrumentationRuleIcon(INSTRUMENTATION_RULE_TYPE.PAYLOAD_COLLECTION),
    label: 'Payload Collection',
    description: 'Collect span attributes containing payload data to traces.',
    docsEndpoint: '/pipeline/rules/payloadcollection',
    docsDescription: 'The “Payload Collection” Rule can be used to add span attributes containing payload data to traces.',
  },
  {
    id: 'code_attributes',
    type: INSTRUMENTATION_RULE_TYPE.CODE_ATTRIBUTES,
    icon: getInstrumentationRuleIcon(INSTRUMENTATION_RULE_TYPE.CODE_ATTRIBUTES),
    label: 'Code Attributes',
    description: 'Collect code attributes containing payload data to traces.',
    docsEndpoint: '/pipeline/rules/codeattributes',
    docsDescription: 'The “Code Attributes” Rule can be used to add code attributes containing payload data to traces.',
  },
]
