import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
  login,
  signup,
  logout,
  getById,
  getLoggedinUser: getLoggedInUser,
  updateScore,
  getEmptyCredentials,
}

async function login({ username, password }) {
  try {
    const users = storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === username)
    if (user) return _setLoggedInUser(user)
  } catch (err) {
    console.log('Login in service --> Has issues login')
    return Promise.reject('Invalid login')
  }
}

async function signup({ username, password, fullName }) {
  const user = { username, password, fullName }
  try {
    const savedUser = await storageService.post(STORAGE_KEY, user)
    return _setLoggedInUser(savedUser)
  } catch (err) {
    console.log('Signup in service --> Has issues signup')
    return Promise.reject('Could not signup')
  }
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  return Promise.resolve()
}

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedInUser(user) {
  const userToSave = { _id: user._id, fullName: user.fullName }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}

function getEmptyCredentials() {
  return {
    username: '',
    password: '',
    fullName: '',
  }
}
