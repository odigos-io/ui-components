import React from 'react'
import { Text } from '../text'
import Theme from '@odigos/ui-theme'
import styled from 'styled-components'
import { K8sLogo } from '@odigos/ui-icons'
import { PLATFORM_TYPE } from '@odigos/ui-utils'

// TODO: make this a dropdown as per Figma

interface PlatformSelectProps {
  type: PLATFORM_TYPE
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 32px;
`

const Title = styled(Text)`
  font-size: 14px;
  margin-right: 10px;
  color: ${({ theme }) => theme.text.secondary};
`

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.info};
`

const PlatformSelect: React.FC<PlatformSelectProps> = ({ type }) => {
  const theme = Theme.useTheme()

  if (type === PLATFORM_TYPE.K8S) {
    return (
      <Container>
        <LogoWrap>
          <K8sLogo size={20} fill={theme.text.info} />
        </LogoWrap>
        <Title>Kubernetes Cluster</Title>
      </Container>
    )
  }

  return (
    <Container>
      <Title>Virtual Machine</Title>
    </Container>
  )
}

export { PlatformSelect, type PlatformSelectProps }
