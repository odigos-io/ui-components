import React, { type ReactNode, type FC } from 'react'
import { Text } from '../text'
import { Badge } from '../badge'
import styled from 'styled-components'
import { DataCardFields, type DataCardFieldsProps, DATA_CARD_FIELD_TYPES } from './data-card-fields'

interface DataCardProps {
  title?: string
  titleBadge?: string | number
  description?: string
  data: DataCardFieldsProps['data']
  action?: ReactNode
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 16px;
  padding: 24px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
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

const ActionWrapper = styled.div`
  margin-left: auto;
`

const DataCard: FC<DataCardProps> = ({ title = 'Details', titleBadge, description, data, action }) => {
  return (
    <CardContainer>
      {!!title || !!description || !!action ? (
        <Header>
          {(!!title || !!action) && (
            <Title>
              {title}
              {/* NOT undefined, because we should allow zero (0) values */}
              {titleBadge !== undefined && <Badge label={titleBadge} />}
              <ActionWrapper>{action}</ActionWrapper>
            </Title>
          )}

          {!!description && <Description>{description}</Description>}
        </Header>
      ) : null}

      <DataCardFields data={data} />
    </CardContainer>
  )
}

export { DataCard, type DataCardProps, DataCardFields, type DataCardFieldsProps, DATA_CARD_FIELD_TYPES }
