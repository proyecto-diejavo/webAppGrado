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

export default { ...paths, ...formNames }
