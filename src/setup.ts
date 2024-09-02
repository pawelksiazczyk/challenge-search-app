import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

import { Options } from 'prettier'

import prettier from 'prettier'
import prettierConfig from '../.prettierrc.json'

const typedConfig = prettierConfig as Options

prettier.format('', typedConfig)

afterEach(() => {
  cleanup()
})
