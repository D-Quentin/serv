// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Private unauthenticated='login'>
        <Set wrap={MainLayout}>
          <Route path="/" page={HomePage} name="home" />
          <Route path="/crypto" page={CryptoPage} name="crypto" />
          <Route path="/profil" page={ProfilPage} name="profil" />
          <Route path="/series" page={SeriesPage} name="series" />
          <Route notfound page={NotFoundPage} />
        </Set>
      </Private>
    </Router>
  )
}

export default Routes
