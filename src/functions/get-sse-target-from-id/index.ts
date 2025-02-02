import { ENTITY_TYPES, type WorkloadId } from '../../@types'

export const getSseTargetFromId = (id: string | WorkloadId, type: ENTITY_TYPES): string => {
  switch (type) {
    case ENTITY_TYPES.SOURCE: {
      let target = ''

      Object.entries(id as WorkloadId).forEach(([key, value]) => {
        target += `${key}=${value}&`
      })

      target.slice(0, -1)

      return target
    }

    default:
      return id as string
  }
}
