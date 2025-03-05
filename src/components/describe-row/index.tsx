import React, { Fragment, type FC } from 'react'
import { Text } from '../text'
import { Status } from '../status'
import { Tooltip } from '../tooltip'
import styled from 'styled-components'
import { FlexColumn, FlexRow } from '../../styled'
import { NOTIFICATION_TYPE, OTHER_STATUS } from '@odigos/ui-utils'

interface DescribeRowProps {
  title?: string
  subTitle?: string
  tooltip?: string
  value?: {
    text?: string
    status?: NOTIFICATION_TYPE | 'transitioning' // from Odigos backend...
  }
}

const Container = styled(FlexRow)`
  width: 100%;
  justify-content: space-between;
`

const Title = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.text.grey};
`

const SubTitle = styled(Text)`
  font-size: 10px;
  color: ${({ theme }) => theme.text.darker_grey};
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`

const ValueText = styled(Text)`
  font-size: 12px;
  text-align: right;
`

const DescribeRow: FC<DescribeRowProps> = ({ title, subTitle, tooltip, value }) => {
  return (
    <Container>
      <FlexColumn $gap={4}>
        <Tooltip text={tooltip || ''}>
          {title && <Title>{title}</Title>}
          {subTitle && <SubTitle>{subTitle}</SubTitle>}
        </Tooltip>
      </FlexColumn>

      <ValueWrapper>
        {!!value?.status ? (
          <Status
            status={value.status === 'transitioning' ? OTHER_STATUS.LOADING : value.status}
            title={value.text || value.status}
            withBorder
            withIcon
          />
        ) : (
          <ValueText>{value?.text || '-'}</ValueText>
        )}
      </ValueWrapper>
    </Container>
  )
}

export { DescribeRow, type DescribeRowProps }
