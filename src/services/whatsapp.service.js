import { useId } from 'react'
import { userService } from './user.service'

const BASE_URL = 'https://web.whatsapp.com/send?phone='

// ?phone=9720502419922&text=hello&app_absent=0

export const whatsappService = {
  sendOnWhatsapp,
}

async function sendOnWhatsapp(toUserId, task) {
  const loggedInUser = userService.getLoggedInUser()

  try {
    const user = userService.getById(toUserId)
  } catch (err) {}
}
