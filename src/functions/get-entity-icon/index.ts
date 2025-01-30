import { ENTITY_TYPES, type SVG } from '../../@types'
import { ActionsIcon, DestinationsIcon, RulesIcon, SourcesIcon } from '../../icons'

export const getEntityIcon = (type: ENTITY_TYPES) => {
  const LOGOS: Record<ENTITY_TYPES, SVG> = {
    [ENTITY_TYPES.SOURCE]: SourcesIcon,
    [ENTITY_TYPES.DESTINATION]: DestinationsIcon,
    [ENTITY_TYPES.ACTION]: ActionsIcon,
    [ENTITY_TYPES.INSTRUMENTATION_RULE]: RulesIcon,
  }

  return LOGOS[type]
}
