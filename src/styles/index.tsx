import React, { type FC, type PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import { getTheme, type ITheme } from './theme'

export * from './animations'
export * from './opacity'
export * from './styled-components'
export { type ITheme }

export const Provider: FC<PropsWithChildren<{ darkMode: boolean }>> = ({ children, darkMode }) => {
  return <ThemeProvider theme={getTheme(darkMode) as ITheme}>{children}</ThemeProvider>
}
