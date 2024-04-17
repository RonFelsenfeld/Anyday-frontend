import emailjs from '@emailjs/browser'
import { showErrorMsg, showSuccessMsg } from './event-bus.service'

export const googleService = {
  signIn,
  signOut,
  addEventToGoogleCalendar,
  sendViaGmail,
}

async function signIn(supabase) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes:
        'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events ',
    },
  })

  if (error) {
    console.error('Log in to Google --> Has issues logging in to Google')
    showErrorMsg('Failed logging in to Google, try again later.')
  }
}

async function signOut(supabase) {
  await supabase.auth.signOut()
}

async function addEventToGoogleCalendar(session, task) {
  if (!session) return showErrorMsg('Require linked Google account')

  // ! Activate
  // const loggedInUser = userService.getLoggedInUser()
  // if (!loggedInUser) return showErrorMsg('Login to access this feature')

  const { title, timeline } = task
  if (!timeline) return showErrorMsg('Task do not have timeline')

  const { startDate, dueDate } = timeline

  const event = {
    summary: `${title}`,
    start: {
      dateTime: new Date(startDate).toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: new Date(dueDate).toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  }

  try {
    await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + session.provider_token, // Access token for Google
      },
      body: JSON.stringify(event),
    })
    showSuccessMsg('Event added to your Google calendar')
  } catch (err) {
    console.log('Had issues with adding event to google calendar')
    showErrorMsg('Could not add an event at the moment')
  }
}

async function sendViaGmail(loggedInUser, toUser, task) {
  const msgInfo = {
    from_name: loggedInUser.fullName,
    to_name: toUser.fullName,
    message: task.title,
    to_email: toUser.email,
  }

  try {
    await emailjs.send('service_urtju63', 'template_2u2rj9i', msgInfo, {
      publicKey: 'VEhtb69W7gXPp42W2',
    })

    showSuccessMsg(`Email sent to ${toUser.fullName}`)
  } catch (err) {
    console.log('FAILED...', err)
  }
}
