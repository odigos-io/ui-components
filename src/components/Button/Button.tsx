import React, { type PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  /**
   * Button text content
   */
  label?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ label, children, ...props }, ref) => {
  return (
    <button ref={ref} {...props}>
      {label}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button, type ButtonProps }
