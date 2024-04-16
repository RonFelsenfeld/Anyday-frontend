import { showErrorMsg } from './event-bus.service'

export const googleService = {
  signIn,
  signOut,
  addEventToGoogleCalendar,
}

async function signIn(supabase) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes:
        'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
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
  const event = {
    summary: 'TITLE',
    start: {
      dateTime: new Date().toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Get's the user's timezone
    },
    end: {
      dateTime: new Date().toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Get's the user's timezone
    },
  }

  await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + session.provider_token, // Access token for Google
    },
    body: JSON.stringify(event),
  })
    .then(data => {
      console.log(data)
      return data.json()
    })
    .then(res => {
      console.log(res)
      alert('EVENT CREATED!')
    })
}
