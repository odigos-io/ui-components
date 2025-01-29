import React, { forwardRef, type PropsWithChildren } from 'react'
import { Text } from '../text'
import styled from 'styled-components'

interface FieldErrorProps extends PropsWithChildren {}

const ErrorWrapper = styled.div`
  padding: 4px 0 0 0;
`

const ErrorMessage = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.text.error};
`

const FieldError = forwardRef<HTMLDivElement, FieldErrorProps>(({ children }, ref) => {
  return (
    <ErrorWrapper ref={ref}>
      <ErrorMessage>{children}</ErrorMessage>
    </ErrorWrapper>
  )
})

export { FieldError, type FieldErrorProps }
