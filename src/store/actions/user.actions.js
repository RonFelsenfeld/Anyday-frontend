import { userService } from '../../services/user.service'
import { SET_USER } from '../reducers/user.reducer'
import { store } from '../store'

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    store.dispatch({ type: SET_USER, user })
    return user
  } catch (err) {
    console.log('User actions -> Cannot login', err)
    throw err
  }
}

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    store.dispatch({ type: SET_USER, user })
  } catch (err) {
    console.log('User actions -> Cannot signup', err)
    throw err
  }
}

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({ type: SET_USER, user: null })
  } catch (err) {
    console.log('User actions -> Cannot logout', err)
  }
}
