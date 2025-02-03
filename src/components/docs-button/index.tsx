import React, { type FC, useRef } from 'react'
import styled from 'styled-components'
import { NotebookIcon } from '@odigos/ui-icons'
import { Button, type ButtonProps } from '../button'

interface DocsButtonProps {
  endpoint?: string
  variant?: ButtonProps['variant']
}

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  gap: 6px;
  min-width: 100px;
`

const DOCS_LINK = 'https://docs.odigos.io'

const DocsButton: FC<DocsButtonProps> = ({ endpoint = '/', variant = 'secondary' }) => {
  const ref = useRef<HTMLButtonElement>(null)

  return (
    <StyledButton
      ref={ref}
      variant={variant}
      onClick={() => {
        window.open(`${DOCS_LINK}${endpoint}`, '_blank', 'noopener noreferrer')
        ref.current?.blur()
      }}
    >
      <NotebookIcon size={18} />
      Docs
    </StyledButton>
  )
}

export { DocsButton, type DocsButtonProps }
