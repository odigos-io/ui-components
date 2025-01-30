import { SIGNAL_TYPE, type SVG } from '../../@types'
import { LogsIcon, MetricsIcon, TracesIcon } from '../../icons'

export const getMonitorIcon = (type: SIGNAL_TYPE) => {
  const LOGOS: Record<SIGNAL_TYPE, SVG> = {
    [SIGNAL_TYPE.LOGS]: LogsIcon,
    [SIGNAL_TYPE.METRICS]: MetricsIcon,
    [SIGNAL_TYPE.TRACES]: TracesIcon,
  }

  return LOGOS[type]
}
