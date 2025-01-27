# UI Components

### Install Library

```shell
yarn add @odigos/ui-components
```

### Local Development

1. Install dependencies:

   ```shell
   yarn install
   ```

2. Run Localhost (with Storybook):

   ```shell
   yarn dev
   ```

3. Commits must be semantic! e.g.

   ```shell
   git commit -m "fix(): a bug"
   ```

| Commit message                                                                                                                                                                              | Release type                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| fix(pencil): stop graphite breaking when too much pressure applied                                                                                                                          | ~~Patch~~ Fix Release                                                                                      |
| feat(pencil): add 'graphiteWidth' option                                                                                                                                                    | ~~Minor~~ Feature Release                                                                                  |
| perf(pencil): remove graphiteWidth option<br /><br />BREAKING CHANGE: The graphiteWidth option has been removed. The default graphite width of 10mm is always used for performance reasons. | ~~Major~~ Breaking Release<br />(Note that the BREAKING CHANGE: token must be in the footer of the commit) |
