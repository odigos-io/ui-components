import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

const packageJson = require('./package.json')

export default {
  input: 'src/index.ts',
  external: ['react', 'react-dom', 'styled-components'],
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
      clean: true, // Ensures cache is cleaned every time
      cacheRoot: undefined, // Prevent cache from being created
    }),
    postcss({
      extensions: ['.css'],
    }),
  ],
}
