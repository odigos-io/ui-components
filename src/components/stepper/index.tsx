import React, { FC, useEffect, useState } from 'react'
import { Text } from '../text'
import { styled } from '@odigos/ui-theme'
import { CheckIcon } from '@odigos/ui-icons'
import { FlexColumn, FlexRow } from '../../styled'

enum STEP_STATE {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  FINISH = 'finish',
}

interface StepperProps {
  data: {
    stepNumber: number
    title: string
  }[]
  currentStep: number
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const Step = styled.div<{ $state: STEP_STATE }>`
  display: flex;
  gap: 16px;
  padding: 8px;
  opacity: ${({ $state }) => ($state === STEP_STATE.ACTIVE ? 1 : $state === STEP_STATE.DISABLED ? 0.5 : 0.8)};
  transition: all 0.3s;
`

const IconWrapper = styled(FlexRow)<{ $state: STEP_STATE }>`
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 32px;
  border: ${({ theme, $state }) => ($state === STEP_STATE.DISABLED ? `1px dashed ${theme.text.dark_grey}` : `1px solid ${theme.colors.secondary}`)};
  opacity: ${({ $state }) => ($state === STEP_STATE.FINISH ? 0.8 : 1)};
`

const Content = styled(FlexColumn)`
  justify-content: center;
  gap: 8px;
`

const Title = styled(Text)``

const Subtitle = styled(Text)``

const Stepper: FC<StepperProps> = ({ data, currentStep = 0 }) => {
  const [stepsList, setStepsList] = useState<(StepperProps['data'][0] & { state: STEP_STATE; subtitle?: string })[]>([])

  useEffect(() => {
    setStepsList(
      data.map((step, i) => {
        if (i < currentStep - 1) {
          return { ...step, state: STEP_STATE.FINISH, subtitle: 'Success' }
        } else if (i === currentStep - 1) {
          return { ...step, state: STEP_STATE.ACTIVE }
        } else {
          return { ...step, state: STEP_STATE.DISABLED }
        }
      })
    )
  }, [currentStep, data])

  return (
    <Container>
      {stepsList.map((step, index) => (
        <Step key={index} $state={step.state}>
          <IconWrapper $state={step.state}>
            {[STEP_STATE.ACTIVE, STEP_STATE.DISABLED].includes(step.state) ? (
              <Text size={12}>{step.stepNumber}</Text>
            ) : step.state === STEP_STATE.FINISH ? (
              <CheckIcon size={20} />
            ) : null}
          </IconWrapper>

          <Content>
            <Title family='secondary'>{step.title}</Title>
            {step.subtitle && (
              <Subtitle size={10} weight={300}>
                {step.subtitle}
              </Subtitle>
            )}
          </Content>
        </Step>
      ))}
    </Container>
  )
}

export { Stepper, type StepperProps }
