import { render } from '@redwoodjs/testing/web'

import ProfilPage from './ProfilPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProfilPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfilPage />)
    }).not.toThrow()
  })
})
