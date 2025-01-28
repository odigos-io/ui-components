import type { FC, MouseEventHandler } from 'react'

export type SVG = FC<{
  /**
   * Size of the SVG icon
   */
  size?: number
  /**
   * Fill color of the SVG icon
   */
  fill?: string
  /**
   * Rotate the SVG icon by a number of degrees
   */
  rotate?: number
  /**
   * Click handler for the SVG icon
   */
  onClick?: MouseEventHandler<SVGSVGElement>
}>
