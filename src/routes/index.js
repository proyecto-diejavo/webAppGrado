import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import ProjectsRoute from './Projects'
import AccountRoute from './Account'
import NotFoundRoute from './NotFound'
import BartenderMainRoute from './bartenderMain'
import adminMainRoute from './adminMain'
import usersRoute from './users'
import WaiterTablesRoute from './waiterTables'
import adminBarRoute from './adminBar'
import journeyRoute from './journey'
import cashierRoute from './cashier'
import BillsRoute from './bills'
import productInventoryRoute from './productInventory'
import MainRoute from './main'
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    AccountRoute(store),
    LoginRoute(store),
    SignupRoute(store),
    ProjectsRoute(store),
    BartenderMainRoute(store),
    adminMainRoute(store),
    usersRoute(store),
    WaiterTablesRoute(store),
    adminBarRoute(store),
    journeyRoute(store),
    usersRoute(store),
    cashierRoute(store),
    BillsRoute(store),
    productInventoryRoute(store),
    MainRoute(store),
    // AsyncRoute(store) // async routes setup by passing store
    // SyncRoute, // sync routes just need route object by itself
    /* Place all Routes above here so NotFoundRoute can act as a 404 page */
    NotFoundRoute(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
