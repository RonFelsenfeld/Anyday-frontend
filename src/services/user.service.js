import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
_createDemoUsers()

export const userService = {
  login,
  signup,
  logout,
  getById,
  getLoggedInUser,
  getEmptyCredentials,
}

async function login({ username, password }) {
  try {
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === username)
    if (user && user.password === password) return _setLoggedInUser(user)
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
  const userToSave = { _id: user._id, fullName: user.fullName, imgUrl: user.imgUrl }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}

function getEmptyCredentials() {
  return {
    username: '',
    password: '',
    fullName: '',
    imgUrl: '',
  }
}

////////////////////////////////////////////////////

function _createDemoUsers() {
  let users = utilService.loadFromStorage(STORAGE_KEY)

  if (!users || !users.length) {
    users = []

    const user1 = {
      _id: 'u101',
      username: 'Atar Mor',
      password: 'atar',
      fullName: 'Atar Mor',
      imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/atar_ofxln7.jpg',
    }

    const user2 = {
      _id: 'u102',
      username: 'Ido Yotvat',
      password: 'ido',
      fullName: 'Ido Yotvat',
      imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168994/ido_ds25mn.jpg',
    }

    const user3 = {
      _id: 'u103',
      username: 'Ron Felsenfeld',
      password: 'ron',
      fullName: 'Ron Felsenfeld',
      imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/ron_hzfvru.jpg',
    }

    const user4 = {
      _id: 'u104',
      username: 'John Doe',
      password: 'john',
      fullName: 'John Doe',
      imgUrl: '',
    }

    users = [user1, user2, user3, user4]
    utilService.saveToStorage(STORAGE_KEY, users)
  }
}
