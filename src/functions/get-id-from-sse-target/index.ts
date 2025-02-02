import { ENTITY_TYPES, K8S_RESOURCE_KIND, type WorkloadId } from '../../@types'

export const getIdFromSseTarget = (target: string, type: ENTITY_TYPES): string | WorkloadId => {
  switch (type) {
    case ENTITY_TYPES.SOURCE: {
      const id: WorkloadId = {
        namespace: '',
        name: '',
        kind: '',
      }

      target.split('&').forEach((str) => {
        const [key, value] = str.split('=') as [keyof WorkloadId, K8S_RESOURCE_KIND]
        id[key] = value
      })

      return id
    }

    default:
      return target as string
  }
}
