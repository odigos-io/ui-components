import { ENTITY_TYPES } from '../../@types'

export const getEntityLabel = (
  entity: Record<string, any>,
  entityType: ENTITY_TYPES,
  options?: { extended?: boolean; prioritizeDisplayName?: boolean }
): string => {
  const { extended, prioritizeDisplayName } = options || {}

  let type = ''
  let name = ''

  switch (entityType) {
    case ENTITY_TYPES.INSTRUMENTATION_RULE:
      const rule = entity
      type = rule.type
      name = rule.ruleName
      break

    case ENTITY_TYPES.SOURCE:
      const source = entity
      type = source.name
      name = source.otelServiceName
      break

    case ENTITY_TYPES.ACTION:
      const action = entity
      type = action.type
      name = action.spec.actionName
      break

    case ENTITY_TYPES.DESTINATION:
      const destination = entity
      type = destination.destinationType.displayName
      name = destination.name
      break

    default:
      break
  }

  if (extended) return type + (name && name !== type ? ` (${name})` : '')
  else if (prioritizeDisplayName) return name || type
  else return type
}
