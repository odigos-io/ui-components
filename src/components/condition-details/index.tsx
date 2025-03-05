import React, { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Text } from '../text'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { FlexRow } from '../../styled'
import { FadeLoader } from '../fade-loader'
import { ExtendArrow } from '../extend-arrow'
import { type Condition, getStatusIcon, mapConditions, NOTIFICATION_TYPE, OTHER_STATUS } from '@odigos/ui-utils'

interface ConditionDetailsProps {
  conditions: Condition[]
  headerLabelError?: string
  headerLabelWarning?: string
  headerLabelSuccess?: string
}

const Container = styled.div<{ $status: Condition['status'] }>`
  border-radius: 24px;
  background-color: ${({ theme, $status }) =>
    $status === NOTIFICATION_TYPE.ERROR
      ? theme.text.error + Theme.opacity.hex['010']
      : $status === NOTIFICATION_TYPE.WARNING
      ? theme.text.warning + Theme.opacity.hex['010']
      : theme.colors.secondary + Theme.opacity.hex['005']};
  &:hover {
    background-color: ${({ theme, $status }) =>
      $status === NOTIFICATION_TYPE.ERROR
        ? theme.text.error + Theme.opacity.hex['020']
        : $status === NOTIFICATION_TYPE.WARNING
        ? theme.text.warning + Theme.opacity.hex['020']
        : theme.colors.secondary + Theme.opacity.hex['010']};
  }
  cursor: pointer;
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
  headerLabelError = 'Something Failed',
  headerLabelWarning = "Something isn't right",
  headerLabelSuccess = 'Everything Successful',
}) => {
  const theme = Theme.useTheme()
  const [extend, setExtend] = useState(false)

  const conditions = mapConditions(c)

  const errors = useMemo(() => conditions.filter(({ status }) => status === NOTIFICATION_TYPE.ERROR), [conditions])
  const hasErrors = !!errors.length
  const warnings = useMemo(() => conditions.filter(({ status }) => status === NOTIFICATION_TYPE.WARNING), [conditions])
  const hasWarnings = !!warnings.length
  const disableds = useMemo(() => conditions.filter(({ status }) => status === OTHER_STATUS.DISABLED), [conditions])
  const hasDisableds = !!disableds.length
  const loadings = useMemo(() => conditions.filter(({ status }) => status === OTHER_STATUS.LOADING), [conditions])
  const hasLoadings = !!loadings.length

  const loading = (!conditions.length || hasLoadings) && !hasErrors && !hasWarnings && !hasDisableds

  useEffect(() => {
    setExtend(hasErrors || hasWarnings || hasDisableds || hasLoadings)
  }, [hasErrors, hasWarnings, hasDisableds, hasLoadings])

  const overallStatus = hasErrors
    ? NOTIFICATION_TYPE.ERROR
    : hasWarnings
    ? NOTIFICATION_TYPE.WARNING
    : hasDisableds
    ? NOTIFICATION_TYPE.INFO
    : NOTIFICATION_TYPE.SUCCESS

  const HeaderIcon = getStatusIcon(overallStatus, theme)
  const headerText = hasErrors
    ? headerLabelError
    : hasWarnings
    ? headerLabelWarning
    : hasDisableds
    ? headerLabelWarning
    : loading
    ? 'Loading...'
    : headerLabelSuccess

  const headerTextColor = hasErrors ? theme.text.error : hasWarnings ? theme.text.warning : theme.text.info
  const headerSubText = `(${hasErrors ? errors.length : hasWarnings ? warnings.length : conditions.length}/${conditions.length})`
  const headerSubTextColor = hasErrors ? theme.text.error_secondary : hasWarnings ? theme.text.warning_secondary : theme.text.info_secondary

  const toggleExtend = useCallback(() => setExtend((prev) => !prev), [])

  return (
    <Container onClick={toggleExtend} $status={overallStatus}>
      <Header>
        {loading ? <FadeLoader /> : <HeaderIcon />}
        <Text color={headerTextColor} size={14}>
          {headerText}
        </Text>
        <Text color={headerSubTextColor} size={12} family='secondary'>
          {headerSubText}
        </Text>
        <ExtendArrow extend={extend} align='right' />
      </Header>

      {extend && (
        <Body>
          {conditions.map(({ status, type, reason, message, lastTransitionTime }, idx) => {
            const Icon =
              status === 'loading'
                ? () => <FadeLoader scale={0.8} />
                : status === 'disabled'
                ? getStatusIcon(NOTIFICATION_TYPE.INFO, theme)
                : getStatusIcon(status, theme)
            const color =
              status === 'disabled'
                ? theme.text.info
                : status === NOTIFICATION_TYPE.ERROR
                ? theme.text.error
                : status === NOTIFICATION_TYPE.WARNING
                ? theme.text.warning
                : theme.text.info
            const boldColor =
              status === 'disabled'
                ? theme.text.info_secondary
                : status === NOTIFICATION_TYPE.ERROR
                ? theme.text.error_secondary
                : status === NOTIFICATION_TYPE.WARNING
                ? theme.text.warning_secondary
                : theme.text.info_secondary

            return (
              <Row key={`condition-${idx}`}>
                <Icon />

                <FlexRow $gap={12} style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Text color={color} size={12}>
                    <TextNoWrap color={boldColor} size={12} weight={700}>
                      {type}
                    </TextNoWrap>
                    {message || reason}
                  </Text>

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
