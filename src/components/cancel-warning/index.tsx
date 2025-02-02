import React from 'react'
import { WarningModal } from '..'
import { NOTIFICATION_TYPE } from '../../@types'

interface CancelWarningProps {
  isOpen: boolean
  noOverlay?: boolean
  name?: string
  onApprove: () => void
  onDeny: () => void
}

const CancelWarning: React.FC<CancelWarningProps> = ({ isOpen, noOverlay, name, onApprove, onDeny }) => {
  return (
    <WarningModal
      isOpen={isOpen}
      noOverlay={noOverlay}
      title={`Cancel${name ? ` ${name}` : ''}`}
      description='Are you sure you want to cancel?'
      approveButton={{
        text: 'Confirm',
        variant: NOTIFICATION_TYPE.WARNING,
        onClick: onApprove,
      }}
      denyButton={{
        text: 'Go Back',
        onClick: onDeny,
      }}
    />
  )
}

export { CancelWarning, type CancelWarningProps }
