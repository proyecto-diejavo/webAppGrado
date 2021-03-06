export const LIST_PATH = '/projects'
export const ACCOUNT_PATH = '/account'
export const LOGIN_PATH = '/login'
export const MIS_ZONAS_PATH = '/mis-zonas'
export const SIGNUP_PATH = '/signup'
export const BARTENDER_MAIN_PATH = '/bartenderMain'
export const WAITER_TABLES_PATH = '/waiter-tables'
export const ACCOUNT_FORM_NAME = 'account'
export const LOGIN_FORM_NAME = 'login'
export const SIGNUP_FORM_NAME = 'signup'
export const NEW_PROJECT_FORM_NAME = 'newProject'
export const ADMIN_MAIN_PATH = '/adminMain'
export const USERS_PATH = '/users'
export const ADMIN_BAR_PATH = '/adminBar'
export const JOURNEY_PATH = '/journey'
export const CASHIER_PATH = '/cashier'
export const BILLS_PATH = '/bills'
export const PRODUCT_INVENTORY_PATH = '/productInventory'
export const MAIN_PATH = '/main'

export const formNames = {
  account: ACCOUNT_FORM_NAME,
  signup: SIGNUP_FORM_NAME,
  login: LOGIN_FORM_NAME
}

export const paths = {
  list: LIST_PATH,
  account: ACCOUNT_PATH,
  login: LOGIN_PATH,
  signup: SIGNUP_PATH
}

export const rolPaths = {
  bartender: BARTENDER_MAIN_PATH,
  mesero: WAITER_TABLES_PATH,
  administrador: ADMIN_MAIN_PATH,
  cajero: CASHIER_PATH,
  cocina: BARTENDER_MAIN_PATH
}
export const states = {
  order: {
    open: 'abierta',
    dispatched: 'despachada',
    toCancel: 'por cancelar',
    cancel: 'cancelada'
  },
  bill: {
    open: 'abierta',
    toClose: 'por cerrar',
    closed: 'cerrada'
  }
}

export default { ...paths, ...formNames }
