import { render } from '@redwoodjs/testing/web'

import SeriesPage from './SeriesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SeriesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SeriesPage />)
    }).not.toThrow()
  })
})
