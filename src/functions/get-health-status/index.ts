import { HEALTH_STATUS } from '../../@types'

export const getHealthStatus = (item: { conditions?: Record<string, any>[] }) => {
  const conditions = item?.conditions || []
  const isUnhealthy = !!conditions.find(({ status }) => ['false', 'error'].includes(String(status).toLowerCase()))

  return isUnhealthy ? HEALTH_STATUS.UNHEALTHY : HEALTH_STATUS.HEALTHY
}
