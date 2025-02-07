# Odigos UI Components

This library contains re-usable components for various Odigos UI deployments, and a library ([ui-containers](https://github.com/odigos-io/ui-containers)).

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

Wrap your app with the theme provider from [@odigos/ui-theme](https://github.com/odigos-io/ui-theme):

```tsx
import Theme from '@odigos/ui-theme'

const AppProviders = () => {
  return (
    <Theme.Provider>
      <App />
    </Theme.Provider>
  )
}
```

Import a component, and call it with it's props:

```tsx
import { Button } from '@odigos/ui-components'
import { PlusIcon } from '@odigos/ui-icons'

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
