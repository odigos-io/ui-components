import React, { type FC } from 'react'
import { Text } from '../text'
import { Badge } from '../badge'
import styled from 'styled-components'
import { FlexRow } from '../../styled'
import { FadeLoader } from '../fade-loader'
import { type SVG } from '@odigos/ui-icons'

interface IconTitleBadgeProps {
  icon: SVG
  title: string
  badge: string | number
  loading?: boolean
}

const Title = styled(Text)`
  color: ${({ theme }) => theme.text.grey};
`

const IconTitleBadge: FC<IconTitleBadgeProps> = ({ icon: Icon, title, badge, loading }) => {
  return (
    <FlexRow $gap={6}>
      {Icon && <Icon />}
      <Title size={14}>{title}</Title>
      <Badge label={badge} />
      {loading && <FadeLoader />}
    </FlexRow>
  )
}

export { IconTitleBadge, type IconTitleBadgeProps }
