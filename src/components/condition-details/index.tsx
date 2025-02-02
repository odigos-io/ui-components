import React, { type FC, useMemo, useState } from 'react'
import { Text } from '../text'
import { hexPercent } from '../../styles'
import { FadeLoader } from '../fade-loader'
import { ExtendArrow } from '../extend-arrow'
import { getStatusIcon } from '../../functions'
import { NOTIFICATION_TYPE } from '../../@types'
import styled, { useTheme } from 'styled-components'

interface ConditionDetailsProps {
  conditions: {
    status: NOTIFICATION_TYPE
    message: string
  }[]
  headerLabelFailed?: string
  headerLabelSuccess?: string
}

const Container = styled.div<{ $hasErrors: boolean }>`
  border-radius: 24px;
  background-color: ${({ theme, $hasErrors }) => ($hasErrors ? theme.text.error + hexPercent['010'] : theme.colors.secondary + hexPercent['005'])};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme, $hasErrors }) => ($hasErrors ? theme.text.error + hexPercent['020'] : theme.colors.secondary + hexPercent['010'])};
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

const ConditionDetails: FC<ConditionDetailsProps> = ({
  conditions = [],
  headerLabelFailed = 'Something Failed',
  headerLabelSuccess = 'Everything Successful',
}) => {
  const theme = useTheme()
  const [extend, setExtend] = useState(false)

  const loading = useMemo(() => !conditions.length, [conditions])
  const errors = useMemo(() => conditions.filter(({ status }) => status === NOTIFICATION_TYPE.ERROR), [conditions])
  const hasErrors = !!errors.length
  const headerText = loading ? 'Loading...' : hasErrors ? headerLabelFailed : headerLabelSuccess
  const HeaderIcon = getStatusIcon(hasErrors ? NOTIFICATION_TYPE.ERROR : NOTIFICATION_TYPE.SUCCESS)

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
          {conditions.map(({ status, message }, idx) => {
            const Icon = getStatusIcon(status)

            return (
              <Row key={`condition-${idx}`}>
                <Icon />
                <Text color={status === NOTIFICATION_TYPE.ERROR ? theme.text.error : theme.text.darker_grey} size={12}>
                  {message}
                </Text>
              </Row>
            )
          })}
        </Body>
      )}
    </Container>
  )
}

export { ConditionDetails, type ConditionDetailsProps }
