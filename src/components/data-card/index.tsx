import React, { type ReactNode, type FC, useState } from 'react'
import { Text } from '../text'
import { Badge } from '../badge'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { FlexRow } from '../../styled'
import { ExtendArrow } from '../extend-arrow'
import { DataCardFields, type DataCardFieldsProps, DATA_CARD_FIELD_TYPES } from './data-card-fields'
import { Status } from '../status'
import { NOTIFICATION_TYPE } from '@odigos/ui-utils'

interface DataCardProps {
  title?: string
  titleBadge?: string | number
  description?: string
  action?: ReactNode | (() => ReactNode)
  withExtend?: boolean
  data: DataCardFieldsProps['data']
}

const CardContainer = styled.div<{ $clickable: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 16px;
  padding: 24px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: background-color 0.3s;
  ${({ $clickable, theme }) =>
    $clickable &&
    `&:hover {
      background-color: ${theme.colors.secondary + Theme.opacity.hex['010']};
    }`}
`

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Title = styled(Text)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
`

const Description = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.text.grey};
`

const ActionWrapper = styled(FlexRow)`
  margin-left: auto;
  gap: 8px;
`

const DataCard: FC<DataCardProps> = ({ title = 'Details', titleBadge, description, action: Action, withExtend, data }) => {
  const [extend, setExtend] = useState(false)

  return (
    <CardContainer $clickable={!!withExtend} onClick={() => withExtend && setExtend((prev) => !prev)}>
      {!!title || !!description || !!Action ? (
        <Header>
          {(!!title || !!Action) && (
            <Title>
              {title}
              {/* NOT undefined, because we should allow zero (0) values */}
              {titleBadge !== undefined && <Badge label={titleBadge} />}
              <ActionWrapper>
                {typeof Action === 'function' ? <Action /> : Action}
                {withExtend && <ExtendArrow extend={false} />}
              </ActionWrapper>
            </Title>
          )}

          {!!description && <Description>{description}</Description>}
        </Header>
      ) : null}

      {(!withExtend || (withExtend && extend)) && <DataCardFields data={data} />}
    </CardContainer>
  )
}

export { DataCard, type DataCardProps, DataCardFields, type DataCardFieldsProps, DATA_CARD_FIELD_TYPES }
