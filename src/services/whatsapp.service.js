import { userService } from './user.service'

const BASE_URL = 'https://web.whatsapp.com/send?phone=972'

// ?phone=9720502419922&text=hello&app_absent=0

export const whatsappService = {
  sendOnWhatsapp,
}

async function sendOnWhatsapp(loggedInUser, toUser, task) {
  const { phoneNumber } = toUser
  const { title } = task

  const msg = `Hi! It's ${loggedInUser.fullName}. Just wanted to update you about the task: '${title}'.`

  const fullURL = BASE_URL + `${phoneNumber}&text=${msg}&app_absent=0`
  window.open(fullURL)
}
