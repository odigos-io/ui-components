import { ACTION_TYPE, type SVG } from '../../@types'
import { AddClusterInfoIcon, DeleteAttributeIcon, PiiMaskingIcon, RenameAttributeIcon, SamplerIcon } from '../../icons'

export const getActionIcon = (type: ACTION_TYPE | 'sampler' | 'attributes') => {
  const typeLowerCased = type?.toLowerCase()
  const isSamplerCategory = typeLowerCased?.includes('sampler')
  const isAttributesCategory = typeLowerCased === 'attributes'

  if (isSamplerCategory) return SamplerIcon
  if (isAttributesCategory) return PiiMaskingIcon

  const LOGOS: Record<ACTION_TYPE, SVG> = {
    [ACTION_TYPE.ADD_CLUSTER_INFO]: AddClusterInfoIcon,
    [ACTION_TYPE.DELETE_ATTRIBUTES]: DeleteAttributeIcon,
    [ACTION_TYPE.PII_MASKING]: PiiMaskingIcon,
    [ACTION_TYPE.RENAME_ATTRIBUTES]: RenameAttributeIcon,
    [ACTION_TYPE.ERROR_SAMPLER]: SamplerIcon,
    [ACTION_TYPE.PROBABILISTIC_SAMPLER]: SamplerIcon,
    [ACTION_TYPE.LATENCY_SAMPLER]: SamplerIcon,
  }

  return LOGOS[type as ACTION_TYPE]
}
