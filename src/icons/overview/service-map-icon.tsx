import React from 'react'
import { SVG } from '../../@types'
import { useTheme } from 'styled-components'

export const ServiceMapIcon: SVG = ({ size = 16, fill: f, rotate = 0, onClick }) => {
  const theme = useTheme()
  const fill = f || theme.text.secondary

  return (
    <svg
      width={size * (16 / 17)}
      height={size}
      viewBox='0 0 16 17'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      style={{ transform: `rotate(${rotate}deg)` }}
      onClick={onClick}
    >
      <path
        stroke={fill}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.67333 8.61735H4.66667M7.34667 8.61735H7.34M9.66667 7.61735L10.6668 8.61744M10.6668 8.61744L11.6667 9.61735M10.6668 8.61744L11.6668 7.61735M10.6668 8.61744L9.66684 9.61735M6.95406 3.76106L9.05573 4.81189C9.39594 4.982 9.56605 5.06705 9.74417 5.10188C9.91313 5.13491 10.0869 5.13491 10.2558 5.10188C10.434 5.06705 10.6041 4.982 10.9443 4.81189C11.9382 4.31494 12.4351 4.06646 12.8395 4.11932C13.2185 4.16887 13.5581 4.37871 13.7719 4.69556C14 5.0336 14 5.58921 14 6.70044V10.6322C14 11.1108 14 11.3501 13.9271 11.5614C13.8627 11.7482 13.7575 11.9184 13.6192 12.0596C13.4628 12.2193 13.2488 12.3263 12.8207 12.5403L10.9541 13.4737C10.6042 13.6486 10.4293 13.736 10.2459 13.7705C10.0834 13.8009 9.91663 13.8009 9.75414 13.7705C9.57067 13.736 9.39576 13.6486 9.04595 13.4737L6.94427 12.4228C6.60406 12.2527 6.43395 12.1677 6.25583 12.1328C6.08687 12.0998 5.91313 12.0998 5.74417 12.1328C5.56605 12.1677 5.39594 12.2527 5.05573 12.4228C4.06182 12.9198 3.56486 13.1683 3.16049 13.1154C2.78147 13.0658 2.44195 12.856 2.22812 12.5392C2 12.2011 2 11.6455 2 10.5343V6.6025C2 6.12389 2 5.88458 2.07287 5.67331C2.13732 5.48648 2.24249 5.31631 2.38078 5.17511C2.53715 5.01545 2.7512 4.90843 3.17928 4.69439L5.04594 3.76106C5.39576 3.58615 5.57067 3.49869 5.75414 3.46427C5.91663 3.43378 6.08337 3.43378 6.24586 3.46427C6.42933 3.49869 6.60424 3.58615 6.95406 3.76106Z'
      />
    </svg>
  )
}
