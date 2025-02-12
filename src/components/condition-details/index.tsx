import React, { type FC, useState } from 'react'
import { Text } from '../text'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { FlexRow } from '../../styled'
import { FadeLoader } from '../fade-loader'
import { ExtendArrow } from '../extend-arrow'
import { type Condition, type FetchedCondition, getStatusIcon, mapConditions, NOTIFICATION_TYPE } from '@odigos/ui-utils'

interface ConditionDetailsProps {
  conditions: (FetchedCondition | Condition)[]
  headerLabelFailed?: string
  headerLabelSuccess?: string
}

const Container = styled.div<{ $hasErrors: boolean }>`
  border-radius: 24px;
  background-color: ${({ theme, $hasErrors }) =>
    $hasErrors ? theme.text.error + Theme.opacity.hex['010'] : theme.colors.secondary + Theme.opacity.hex['005']};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme, $hasErrors }) =>
      $hasErrors ? theme.text.error + Theme.opacity.hex['020'] : theme.colors.secondary + Theme.opacity.hex['010']};
  }
  transition: background 0.3s;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 6px 18px 12px 18px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const TextNoWrap = styled(Text)`
  white-space: nowrap;
`

const ConditionDetails: FC<ConditionDetailsProps> = ({
  conditions: c,
  headerLabelFailed = 'Something Failed',
  headerLabelSuccess = 'Everything Successful',
}) => {
  const theme = Theme.useTheme()
  const [extend, setExtend] = useState(false)

  const conditions = mapConditions(c)

  const errors = conditions.filter(({ status }) => status === NOTIFICATION_TYPE.ERROR)
  const hasErrors = !!errors.length

  const warnings = conditions.filter(({ status }) => status === NOTIFICATION_TYPE.WARNING)
  const hasWarnings = !!warnings.length

  const loading = (!conditions.length || hasWarnings) && !hasErrors

  const headerText = hasErrors ? headerLabelFailed : loading ? 'Loading...' : headerLabelSuccess
  const HeaderIcon = getStatusIcon(hasErrors ? NOTIFICATION_TYPE.ERROR : NOTIFICATION_TYPE.SUCCESS, theme)

  return (
    <Container onClick={() => setExtend((prev) => !prev)} $hasErrors={hasErrors}>
      <Header>
        {loading ? <FadeLoader /> : <HeaderIcon />}
        <Text color={hasErrors ? theme.text.error : theme.text.grey} size={14}>
          {headerText}
        </Text>
        <Text color={hasErrors ? theme.text.error_secondary : theme.text.dark_grey} size={12} family='secondary'>
          ({hasErrors ? errors.length : conditions.length}/{conditions.length})
        </Text>
        <ExtendArrow extend={extend} align='right' />
      </Header>

      {extend && (
        <Body>
          {conditions.map(({ status, type, reason, message, lastTransitionTime }, idx) => {
            const Icon = status === NOTIFICATION_TYPE.WARNING ? () => FadeLoader({ scale: 0.8 }) : getStatusIcon(status, theme)
            const color = status === NOTIFICATION_TYPE.ERROR ? theme.text.error : theme.text.darker_grey
            const boldColor = status === NOTIFICATION_TYPE.ERROR ? theme.text.error_secondary : theme.text.grey

            return (
              <Row key={`condition-${idx}`}>
                <Icon />

                <FlexRow $gap={12} style={{ width: '100%', justifyContent: 'space-between' }}>
                  <FlexRow $gap={12} style={{ width: '100%' }}>
                    <TextNoWrap color={boldColor} size={12} weight={900}>
                      {type}
                    </TextNoWrap>
                    <Text color={color} size={12}>
                      {message || reason}
                    </Text>
                  </FlexRow>

                  <TextNoWrap color={color} size={12}>
                    {new Date(lastTransitionTime).toLocaleString()}
                  </TextNoWrap>
                </FlexRow>
              </Row>
            )
          })}
        </Body>
      )}
    </Container>
  )
}

export { ConditionDetails, type ConditionDetailsProps }
