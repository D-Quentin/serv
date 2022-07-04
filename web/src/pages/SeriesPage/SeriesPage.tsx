import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SeriesPage = () => {
  return (
    <>
      <MetaTags title="Series" description="Series page" />

      <h1>SeriesPage</h1>
      <p>
        Find me in <code>./web/src/pages/SeriesPage/SeriesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>series</code>, link to me with `
        <Link to={routes.series()}>Series</Link>`
      </p>
    </>
  )
}

export default SeriesPage
