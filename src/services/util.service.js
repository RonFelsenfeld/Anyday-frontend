export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  getFormattedTimeline,
  debounce,
  randomPastTime,
  calcPastTime,
  saveToStorage,
  loadFromStorage,
  animateCSS,
  getInitials,
  calcPercentageOfElapsedTime,
  getNumOfDays,
  greetBasedOnHour,
  getRandomTimestamp,
}

function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function calcPastTime(timestamp) {
  // Current time in milliseconds
  var currentTime = Date.now();
  
  var timeDifference = currentTime - timestamp;
  
  var minutes = Math.floor(timeDifference / (1000 * 60));
  var hours = Math.floor(timeDifference / (1000 * 60 * 60));
  var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  var weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
  var months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));

  if (minutes < 1) {
      return 'just now';
  } else if (minutes < 60) {
      return minutes + ' minutes ago';
  } else if (hours < 24) {
      return hours + ' hours ago';
  } else if (days === 1) {
      return 'yesterday';
  } else if (days < 7) {
      return days + ' days ago';
  } else if (weeks === 1) {
      return 'last week';
  } else if (weeks < 4) {
      return weeks + ' weeks ago';
  } else if (months === 1) {
      return 'last month';
  } else {
      return 'more than a month ago';
  }
}


function getFormattedTimeline(timestamp1, timestamp2) {
  const date1 = new Date(timestamp1)
  const date2 = new Date(timestamp2)

  const day1 = date1.getDate()
  const day2 = date2.getDate()
  const month2 = date2.toLocaleString('default', { month: 'short' })

  const formattedDateRange = `${day1} - ${day2} ${month2}`
  return formattedDateRange
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function animateCSS(el, animation = 'bounce') {
  const prefix = 'animate__'
  return new Promise(resolve => {
    const animationName = `${prefix}${animation}`
    el.classList.add(`${prefix}animated`, animationName)

    el.addEventListener('animationend', handleAnimationEnd, { once: true })

    function handleAnimationEnd(event) {
      event.stopPropagation()
      // el.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }
  })
}

function getInitials(fullName) {
  const words = fullName.split(' ')
  let initials = ''

  for (let i = 0; i < words.length && initials.length < 2; i++) {
    initials += words[i][0].toUpperCase()
  }
  return initials
}

function calcPercentageOfElapsedTime(startDate, dueDate) {
  if (!startDate || !dueDate) return 0
  if (dueDate < Date.now()) return 100
  else if (startDate > Date.now()) return 0
  else {
    const timeDiff = dueDate - startDate
    const timeElapsedSinceStartDate = Date.now() - startDate

    const percentageOfElapsedTime = (timeElapsedSinceStartDate / timeDiff) * 100

    return percentageOfElapsedTime.toFixed(1)
  }
}

function getNumOfDays(startDate, dueDate) {
  const start = new Date(startDate)
  const end = new Date(dueDate)
  const diff = Math.abs(end - start)

  const daysDifference = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return daysDifference
}

function greetBasedOnHour() {
  const currentHour = new Date().getHours()

  if (currentHour >= 6 && currentHour < 12) {
    return 'Good morning'
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Good afternoon'
  } else if (currentHour >= 18 && currentHour < 22) {
    return 'Good evening'
  } else {
    return 'Good night'
  }
}

function getRandomTimestamp() {
  var currentTime = Date.now()

  var twoMonthsAgo = new Date()
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2)
  var twoMonthsAgoTimestamp = twoMonthsAgo.getTime()

  var randomTimestamp =
    Math.floor(Math.random() * (currentTime - twoMonthsAgoTimestamp)) + twoMonthsAgoTimestamp

  return randomTimestamp
}
