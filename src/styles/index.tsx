import React, { type FC, type PropsWithChildren } from 'react'
import { ThemeProvider, useTheme } from 'styled-components'
import { getTheme, type ITheme } from './theme'
import './globals.css'

export const Provider: FC<PropsWithChildren<{ darkMode: boolean }>> = ({ children, darkMode }) => {
  return <ThemeProvider theme={getTheme(darkMode) as ITheme}>{children}</ThemeProvider>
}

export * from './animations'
export * from './opacity'
export { type ITheme, useTheme }
