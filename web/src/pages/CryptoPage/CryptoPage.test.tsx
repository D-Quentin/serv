import { render } from '@redwoodjs/testing/web'

import CryptoPage from './CryptoPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CryptoPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CryptoPage />)
    }).not.toThrow()
  })
})
