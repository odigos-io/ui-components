# Odigos UI Components

## Installation

Using **npm**:

```shell
npm i @odigos/ui-components
```

Using **yarn**:

```shell
yarn add @odigos/ui-components
```

## Usage

Wrap your app with a `styled-components` theme provider:

```tsx
import { ThemeProvider } from 'styled-components'
import { theme } from '@odigos/ui-components'

const AppProviders = () => {
  const darkMode = true

  return (
    <ThemeProvider theme={theme.getTheme(darkMode)}>
      <App />
    </ThemeProvider>
  )
}
```

Import a component, and call it with it's props:

```tsx
import { Button, icons } from '@odigos/ui-components'

const App = () => {
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <Button onClick={handleClick}>
      <icons.PlusIcon /> Add New...
    </Button>
  )
}
```
