export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  getEmptyBoard
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

function getEmptyBoard() {
  return {
    // _id: utilService.makeId(),
    title: 'New Board',
    isStarred: false,
    archivedAt: null,
    statuses: [
      {
        id: 's101',
        title: 'Done',
        color: '#00c875',
      },
      {
        id: 's102',
        title: 'Working on it',
        color: '#fdab3d',
      },
      {
        id: 's103',
        title: 'Stuck',
        color: '#df2f4a',
      },
      {
        id: 's104',
        title: '',
        color: '#c4c4c4',
      },
    ],
    persons: [
      {
        id: 'u101',
        fullName: 'Atar Mor',
        imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/atar_ofxln7.jpg',
      },
      {
        id: 'u102',
        fullName: 'Ido Yotvat',
        imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168994/ido_ds25mn.jpg',
      },
      {
        id: 'u103',
        fullName: 'Ron Felsenfeld',
        imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/ron_hzfvru.jpg',
      },
    ],
    priorities: [
      {
        id: 'pri101',
        title: 'Critical',
        color: '#333333',
      },
      {
        id: 'pri102',
        title: 'High',
        color: '#401694',
      },
      {
        id: 'pri103',
        title: 'Medium',
        color: '#5559df',
      },
      {
        id: 'pri104',
        title: 'Low',
        color: '#579bfc',
      },
      {
        id: 'pri105',
        title: '',
        color: '#c4c4c4',
      },
    ],
    groups: [
      {
        id: 'g1',
        title: 'Group1',
        archivedAt: null,
        tasks: [
          {
            id: 't101',
            title: 'task 1',
            personsIds: ['u101'],
            status: 'Working on it',
            priority: 'High',
            timeline: {
              startDate: 1712077970,
              dueDate: 1712250770,
            },
          },
          {
            id: 't102',
            title: 'task 2',
            personsIds: ['u103'],
            status: 'Done',
            priority: 'Medium',
            timeline: {
              startDate: 1712164370,
              dueDate: 1712941970,
            },
          },
          {
            id: 't103',
            title: 'task 3',
            personsIds: ['u101', 'u102', 'u103'],
            status: 'Stuck',
            priority: 'High',
            timeline: {
              startDate: 1711991570,
              dueDate: 1712337170,
            },
            files: {
              type: 'url',
              url: 'https://www.w3schools.com/howto/howto_css_modals.asp',
              desc: 'How to modal',
            },
          }
        ],
        style: {
          color: '#579bfc',
        },
      },
      {
        id: 'g2',
        title: 'group 2',
        archivedAt: null,
        tasks: [
          {
            id: 't101',
            title: 'task 1',
            personsIds: ['u101', 'u103'],
            priority: 'High',
            timeline: {
              startDate: 1711991570,
              dueDate: 1712337170,
            },
            files: {
              type: 'url',
              url: 'https://www.youtube.com/watch?v=1BfCnjr_Vjg&t=229s',
              desc: 'how to',
            },
          },
          {
            id: 't102',
            title: 'task 2',
            personsIds: ['u102'],
            status: 'Stuck',
            priority: 'Critical',
            timeline: {
              startDate: 1711991570,
              dueDate: 1712164370,
            },
            files: {
              type: 'img',
              url: 'https://someImgUrl',
              desc: 'Forme 1.png',
            },
          }
        ],
        style: {
          color: '#037f4c',
        },
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 1712163768641,
        byPerson: {
          _id: 'u101',
          fullName: 'Atar Mor',
          imgUrl: 'http://some-img',
        },
        group: {
          id: 'g3',
          title: 'Design',
        },
        task: {
          id: 't101',
          title: 'Design intuitive user interface for task management',
        },
      },
    ],
    cmpsOrder: [
      'PersonsPicker',
      'StatusPicker',
      'PriorityPicker',
      'TimelinePicker',
      'FilesPicker',
    ],
  }
}