import type { FC, MouseEventHandler } from 'react'

export type SVG = FC<{
  /**
   * Size of the SVG icon
   */
  size?: number
  /**
   * Fill color of the SVG icon
   */
  fill?: string
  /**
   * Rotate the SVG icon by a number of degrees
   */
  rotate?: number
  /**
   * Click handler for the SVG icon
   */
  onClick?: MouseEventHandler<SVGSVGElement>
}>

export enum NOTIFICATION_TYPE {
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  DEFAULT = 'default',
}

export enum PLATFORM_TYPE {
  K8S = 'k8s',
  VM = 'vm',
}

export enum K8S_RESOURCE_KIND {
  DEPLOYMENT = 'Deployment',
  DAEMON_SET = 'DaemonSet',
  STATEFUL_SET = 'StatefulSet',
}

export interface WorkloadId {
  namespace: string
  name: string
  kind: K8S_RESOURCE_KIND | '' // Empty string is important for default values
}

export enum PROGRAMMING_LANGUAGES {
  GO = 'go',
  JAVASCRIPT = 'javascript',
  PYTHON = 'python',
  JAVA = 'java',
  DOTNET = 'dotnet',
  MYSQL = 'mysql',
  NGINX = 'nginx',

  IGNORED = 'ignored',
  UNKNOWN = 'unknown', // language detection completed but could not find a supported language
  PROCESSING = 'processing', // language detection is not yet complotted, data is not available
  NO_CONTAINERS = 'no containers', // language detection completed but no containers found or they are ignored
  NO_RUNNING_PODS = 'no running pods', // no running pods are available for language detection
}

export enum HEALTH_STATUS {
  HEALTHY = 'healthy',
  UNHEALTHY = 'unhealthy',
}

export enum SIGNAL_TYPE {
  LOGS = 'logs',
  METRICS = 'metrics',
  TRACES = 'traces',
}

export enum ENTITY_TYPES {
  SOURCE = 'source',
  DESTINATION = 'destination',
  ACTION = 'action',
  INSTRUMENTATION_RULE = 'rule',
}

export enum ACTION_TYPE {
  ADD_CLUSTER_INFO = 'AddClusterInfo',
  DELETE_ATTRIBUTES = 'DeleteAttribute',
  RENAME_ATTRIBUTES = 'RenameAttribute',
  ERROR_SAMPLER = 'ErrorSampler',
  PROBABILISTIC_SAMPLER = 'ProbabilisticSampler',
  LATENCY_SAMPLER = 'LatencySampler',
  PII_MASKING = 'PiiMasking',
}

export enum INSTRUMENTATION_RULE_TYPE {
  PAYLOAD_COLLECTION = 'PayloadCollection',
  CODE_ATTRIBUTES = 'CodeAttributes',
  UNKNOWN_TYPE = 'UnknownType',
}

export interface MonitorsOption {
  id: SIGNAL_TYPE
  value: string
}

export interface ActionOption {
  id: string
  type?: ACTION_TYPE
  icon?: SVG
  label: string
  description?: string
  allowedSignals?: SIGNAL_TYPE[]
  docsEndpoint?: string
  docsDescription?: string
  items?: ActionOption[]
}

export type InstrumentationRuleOption = {
  id: string
  type?: INSTRUMENTATION_RULE_TYPE
  icon?: SVG
  label: string
  description?: string
  docsEndpoint?: string
  docsDescription?: string
  items?: InstrumentationRuleOption[]
}
