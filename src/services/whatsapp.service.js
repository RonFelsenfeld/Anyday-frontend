const BASE_URL = 'https://web.whatsapp.com/send?phone=972'

export const whatsappService = {
  sendOnWhatsapp,
}

async function sendOnWhatsapp(loggedInUser, toUser, task) {
  const { phoneNumber } = toUser
  const { title } = task

  const currentURL = window.location.href
  const taskURL = `${currentURL}/task/${task.id}`

  const msg = `Hi! It's ${loggedInUser.fullName}. Just wanted to update you about the task: '${title}'. \nJump right in and check it out: ${taskURL} `

  const fullURL = BASE_URL + `${phoneNumber}&text=${msg}&app_absent=0`
  window.open(fullURL)
}
