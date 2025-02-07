import React, { type CSSProperties, type FC, type MouseEventHandler, useEffect, useState } from 'react'
import { Text } from '../text'
import { Tooltip } from '../tooltip'
import Theme from '@odigos/ui-theme'
import { FlexColumn } from '../../styled'
import { FieldError } from '../field-error'
import styled, { useTheme } from 'styled-components'
import { CheckIcon, MinusIcon } from '@odigos/ui-icons'

interface CheckboxProps {
  title?: string
  titleColor?: CSSProperties['color']
  tooltip?: string
  value?: boolean
  partiallyChecked?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
  style?: CSSProperties
  errorMessage?: string
  allowPropagation?: boolean
}

const Container = styled.div<{ $disabled?: CheckboxProps['disabled'] }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`

const CheckboxWrapper = styled.div<{ $isChecked: boolean; $disabled?: CheckboxProps['disabled'] }>`
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px dashed ${({ $isChecked, theme }) => ($isChecked ? 'transparent' : theme.colors.secondary)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isChecked, theme }) => ($isChecked ? theme.colors.majestic_blue : theme.colors.secondary + Theme.opacity.hex['020'])};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  transition: border 0.3s, background-color 0.3s;
`

const Checkbox: FC<CheckboxProps> = ({
  title,
  titleColor,
  tooltip,
  value = false,
  partiallyChecked = false,
  onChange,
  disabled,
  style,
  errorMessage,
  allowPropagation = false,
}) => {
  const theme = useTheme()

  const [isChecked, setIsChecked] = useState(value)
  useEffect(() => setIsChecked(value), [value])

  const handleToggle: MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return
    if (!allowPropagation) e.stopPropagation()

    if (onChange) onChange(partiallyChecked ? true : !isChecked)
    else setIsChecked((prev) => (partiallyChecked ? true : !prev))
  }

  return (
    <FlexColumn>
      <Container data-id={`checkbox${!!title ? `-${title}` : ''}`} $disabled={disabled} onClick={handleToggle} style={style}>
        <CheckboxWrapper $isChecked={isChecked || partiallyChecked} $disabled={disabled}>
          {partiallyChecked ? <MinusIcon fill={theme.text.white} /> : isChecked ? <CheckIcon fill={theme.text.white} /> : null}
        </CheckboxWrapper>

        {title && (
          <Tooltip text={tooltip} withIcon>
            <Text size={12} color={titleColor || theme.text.grey} style={{ maxWidth: '90%' }}>
              {title}
            </Text>
          </Tooltip>
        )}
      </Container>

      {!!errorMessage && <FieldError>{errorMessage}</FieldError>}
    </FlexColumn>
  )
}

export { Checkbox, type CheckboxProps }
