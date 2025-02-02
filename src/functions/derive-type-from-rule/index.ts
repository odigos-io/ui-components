import { INSTRUMENTATION_RULE_TYPE } from '../../@types'

export const deriveTypeFromRule = (rule: Record<string, any>) => {
  const allKeysAreNull = (obj: Record<string, any>) => Object.values(obj).every((v) => v === null)

  if (rule.payloadCollection && !allKeysAreNull(rule.payloadCollection)) {
    return INSTRUMENTATION_RULE_TYPE.PAYLOAD_COLLECTION
  } else if (rule.codeAttributes && !allKeysAreNull(rule.codeAttributes)) {
    return INSTRUMENTATION_RULE_TYPE.CODE_ATTRIBUTES
  }

  return INSTRUMENTATION_RULE_TYPE.UNKNOWN_TYPE
}
