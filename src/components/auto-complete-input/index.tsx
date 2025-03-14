import React, { useState, type ChangeEvent, type KeyboardEvent, type FC, type InputHTMLAttributes, type CSSProperties } from 'react'
import { Text } from '../text'
import styled from 'styled-components'
import { type SVG } from '@odigos/ui-icons'

interface Option {
  type?: string
  label: string
  description?: string
  icon?: SVG
  items?: Option[] // For handling a list of items
}

interface AutocompleteInputProps extends InputHTMLAttributes<HTMLInputElement> {
  options: Option[]
  placeholder?: string
  selectedOption?: Option
  onOptionSelect?: (option?: Option) => void
  style?: CSSProperties
  disabled?: boolean
}

const AutocompleteContainer = styled.div`
  position: relative;
`

const InputWrapper = styled.div`
  width: calc(100% - 16px);
  display: flex;
  align-items: center;
  height: 36px;
  gap: 8px;
  padding-left: 12px;
  transition: border-color 0.3s;
  border-radius: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.text.secondary};
  font-size: 14px;
  font-family: ${({ theme }) => theme.font_family.primary};
  font-weight: 300;
  &::placeholder {
    color: ${({ theme }) => theme.text.secondary};
    font-family: ${({ theme }) => theme.font_family.primary};
    opacity: 0.4;
    font-size: 14px;
    font-weight: 300;
    line-height: 22px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`

const OptionsList = styled.ul`
  position: absolute;
  max-height: 500px;
  top: 32px;
  border-radius: 24px;
  width: calc(100% - 32px);
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.dropdown_bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 9999;
  padding: 12px;
`

const OptionItemContainer = styled.li<{ $isList: boolean }>`
  width: calc(100% - 24px);
  padding: 8px 12px;
  cursor: ${({ $isList }) => ($isList ? 'default' : 'pointer')};
  border-radius: 24px;
  gap: 8px;
  display: flex;
  align-items: ${({ $isList }) => ($isList ? 'flex-start' : 'center')};
  background: transparent;
  &:hover {
    background: ${({ theme, $isList }) => !$isList && theme.colors.dropdown_bg_2};
  }
`

const OptionContent = styled.div`
  width: 100%;
`

const SubOptionContainer = styled.div`
  display: flex;
  width: 100%;
`

const VerticalLine = styled.div`
  width: 1px;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.dropdown_bg_2};
  position: absolute;
  left: 33px;
`

const OptionLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const OptionLabel = styled(Text)`
  flex: 1;
  font-size: 14px;
`

const OptionDescription = styled(Text)`
  color: ${({ theme }) => theme.text.grey};
  font-size: 10px;
  line-height: 150%;
`

const SubOptionsList = styled.ul`
  padding-left: 0px;
  margin: 4px 0 0 0;
  list-style: none;
  width: 100%;
`

const filterOptions = (optionsList: Option[], input: string): Option[] => {
  return optionsList.reduce<Option[]>((acc, option) => {
    if (option.items) {
      const filteredSubItems = filterOptions(option.items, input)
      if (filteredSubItems.length) {
        acc.push({ ...option, items: filteredSubItems })
      }
    } else if (option.label.toLowerCase().includes(input.toLowerCase())) {
      acc.push(option)
    }
    return acc
  }, [])
}

const AutocompleteInput: FC<AutocompleteInputProps> = ({
  placeholder = 'Type to search...',
  options,
  selectedOption,
  onOptionSelect,
  style,
  disabled,
  ...props
}) => {
  const [query, setQuery] = useState(selectedOption?.label || '')
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(filterOptions(options, ''))
  const [showOptions, setShowOptions] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const Icon = selectedOption?.icon

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()

    const input = e.target.value
    const filtered = filterOptions(options, input)
    const matched = filtered.length === 1 && filtered[0].label === input ? filtered[0] : undefined

    setQuery(input)
    setFilteredOptions(filtered)
    handleOptionClick(matched)
  }

  const handleOptionClick = (option?: Option) => {
    if (!!option) setQuery(option.label)
    setShowOptions(!option)
    onOptionSelect?.(option)
  }

  const flattenOptions = (options: Option[]): Option[] => {
    return options.reduce<Option[]>((acc, option) => {
      acc.push(option)
      if (option.items) {
        acc = acc.concat(flattenOptions(option.items))
      }
      return acc
    }, [])
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!['Enter'].includes(e.key)) e.stopPropagation()

    // Flatten the options to handle keyboard navigation - TODO: Refactor this
    return

    const flatOptions = flattenOptions(filteredOptions)
    if (e.key === 'ArrowDown' && activeIndex < flatOptions.length - 1) {
      setActiveIndex(activeIndex + 1)
    } else if (e.key === 'ArrowUp' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      handleOptionClick(flatOptions[activeIndex])
    }
  }

  return (
    <AutocompleteContainer style={style}>
      <InputWrapper>
        {Icon && <Icon />}
        <StyledInput
          type='text'
          value={query}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          onBlur={() => !disabled && setShowOptions(false)}
          onFocus={() => !disabled && setShowOptions(true)}
          {...props}
        />
      </InputWrapper>

      {showOptions && (
        <OptionsList>
          {filteredOptions.map((option, index) => (
            <OptionItem key={option.type || option.label} option={option} onClick={handleOptionClick} />
          ))}
        </OptionsList>
      )}
    </AutocompleteContainer>
  )
}

interface OptionItemProps {
  option: Option
  renderIcon?: boolean
  onClick: (option: Option) => void
}

const OptionItem: FC<OptionItemProps> = ({ option, renderIcon = true, onClick }) => {
  const hasSubItems = !!option.items && option.items.length > 0
  const Icon = option.icon

  return (
    <OptionItemContainer
      data-id={`option-${option.type || option.label}`}
      $isList={hasSubItems}
      onMouseDown={() => (hasSubItems ? null : onClick(option))}
    >
      {Icon && renderIcon && <Icon />}

      <OptionContent>
        <OptionLabelWrapper>
          <OptionLabel>{option.label}</OptionLabel>
          <OptionDescription>{option.description}</OptionDescription>
        </OptionLabelWrapper>

        {hasSubItems && (
          <SubOptionsList>
            {option.items?.map((subOption) => (
              <SubOptionContainer key={subOption.type || subOption.label}>
                <VerticalLine />
                <OptionItem option={subOption} renderIcon={false} onClick={onClick} />
              </SubOptionContainer>
            ))}
          </SubOptionsList>
        )}
      </OptionContent>
    </OptionItemContainer>
  )
}

export { AutocompleteInput, type AutocompleteInputProps }
