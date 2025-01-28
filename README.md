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

Wrap your app with the theme provider:

```tsx
import { Theme } from '@odigos/ui-components'

const AppProviders = () => {
  const darkMode = true

  return (
    <Theme.Provider darkMode={darkMode}>
      <App />
    </Theme.Provider>
  )
}
```

Import a component, and call it with it's props:

```tsx
import { Button, PlusIcon } from '@odigos/ui-components'

const App = () => {
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <Button onClick={handleClick}>
      <PlusIcon size={20} />
      Add New...
    </Button>
  )
}
```
