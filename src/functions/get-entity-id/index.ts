import { type WorkloadId } from '../../@types'

export const getEntityId = (item: Record<string, any>): string | WorkloadId | undefined => {
  if ('ruleId' in item) {
    // Instrumentation Rule
    return item.ruleId
  } else if ('id' in item) {
    // Destination or Action
    return item.id
  } else if ('kind' in item && 'name' in item && 'namespace' in item) {
    // Source
    return {
      namespace: item.namespace,
      name: item.name,
      kind: item.kind,
    }
  }

  console.warn('getEntityId() - cannot get ID of entity:', item)
  return undefined
}
