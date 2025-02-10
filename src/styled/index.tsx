import { styled } from '@odigos/ui-theme'

// These are re-usable styled-components, they are not actual components

export const FlexRow = styled.div<{ $gap?: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ $gap = 2 }) => $gap}px;
`

export const FlexColumn = styled.div<{ $gap?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ $gap = 2 }) => $gap}px;
`

export const CenterThis = styled(FlexColumn)`
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
`
