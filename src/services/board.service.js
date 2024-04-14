import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const BOARDS_KEY = 'boardDB'
_createDemoBoard()

export const boardService = {
  query,
  getById,
  remove,
  save,
  getDefaultBoardFilter,
  getDefaultGroupTaskFilter,
  getDefaultSortBy,
  getGroupById,
  removeGroup,
  saveGroup,
  removeTask,
  saveTask,
  getEmptyTask,
  getEmptyComment,
  getEmptyBoard,
  getEmptyGroup,
  getPerson,
  getPersonUrl,
  getTotalTasksByBoard,
  getColTitle,
  getGroupColors,
  getTaskById,
  filterBoard,
  sortBoard,
}

async function query(boardFilterBy) {
  try {
    var boards = await storageService.query(BOARDS_KEY)
    var boardsToReturn = boards.slice()
    const regExp = new RegExp(boardFilterBy.txt, 'i')
    boardsToReturn = boardsToReturn.filter(board => regExp.test(board.title))

    return boardsToReturn
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  // boards = boards.map(({ _id, title, imgUlr }) => ({ _id, title, imgUlr }))
}

async function getById(boardId) {
  var board = await storageService.get(BOARDS_KEY, boardId)
  return board
}

function remove(boardId) {
  return storageService.remove(BOARDS_KEY, boardId)
}

function save(board) {
  if (board._id) {
    return storageService.put(BOARDS_KEY, board)
  } else {
    return storageService.post(BOARDS_KEY, board)
  }
}

function filterBoard(board, filterBy) {
  let groupsToReturn = board.groups.slice()

  if (filterBy.txt) {
    const regExp = new RegExp(filterBy.txt, 'i')

    const groupsFilteredByTitle = groupsToReturn.filter(group => regExp.test(group.title))

    const filteredTasksGroups = groupsToReturn.filter(group =>
      group.tasks?.some(t => regExp.test(t.title))
    )
    const filteredAll = filteredTasksGroups.map(group => {
      const filteredGroup = group.tasks.filter(t => regExp.test(t.title))
      return { ...group, tasks: filteredGroup }
    })

    groupsToReturn = [...groupsFilteredByTitle, ...filteredAll]
  }

  if (filterBy.person) {
    const personGroups = groupsToReturn.filter(group =>
      group.tasks.some(t => t.personsIds?.includes(filterBy.person))
    )
    const groupWithPersonTasks = personGroups.map(group => {
      const filteredGroup = group.tasks.filter(t => t.personsIds?.includes(filterBy.person))
      return { ...group, tasks: filteredGroup }
    })

    groupsToReturn = [...groupWithPersonTasks]
  }

  // Remove duplicate groups
  groupsToReturn = groupsToReturn.reduce((unique, item) => {
    return unique.some(u => u.id === item.id) ? unique : [...unique, item]
  }, [])
  return groupsToReturn
}

function sortBoard(board, sortBy) {
  let groupsToReturn = board.groups.slice()

  groupsToReturn = groupsToReturn.map(group => {
    let sortedTasks = null

    if (sortBy.txt) {
      sortedTasks = group.tasks.sort((t1, t2) => t1.title.localeCompare(t2.title) * sortBy.txt)
    }

    if (sortBy.person) {
      sortedTasks = _sortByPersons(board, group, sortBy)
    }

    return { ...group, tasks: sortedTasks || group.tasks }
  })

  return groupsToReturn
}

function getPerson(board, personId) {
  return board.persons.find(p => p.id === personId)
}

function getPersonUrl(board, personId) {
  const person = board.persons.find(p => p.id === personId)
  return person?.imgUrl
}

function getTotalTasksByBoard(board) {
  let totalTasks = 0
  board.groups.forEach(group => (totalTasks += group.tasks.length))
  return totalTasks
}

function getColTitle(cmp) {
  switch (cmp) {
    case 'PersonPicker':
      return 'Person'
    case 'StatusPicker':
      return 'Status'
    case 'PriorityPicker':
      return 'Priority'
    case 'TimelinePicker':
      return 'Timeline'
    case 'FilesPicker':
      return 'Files'
    default:
      cmp
  }
}

function getDefaultBoardFilter() {
  return { txt: '' }
}

function getDefaultSortBy() {
  return { txt: 1 }
}

// * --------------------------------- GROUPS ---------------------------------

function getDefaultGroupTaskFilter() {
  return { txt: '', person: null }
}

function removeGroup(board, groupId) {
  const groupIdx = board.groups.findIndex(group => group.id === groupId)
  if (groupIdx < 0) {
    throw new Error(`Update failed, cannot find group with id: ${groupId}`)
  }
  board.groups.splice(groupIdx, 1)
  return save(board)
}

function saveGroup(board, group) {
  if (group.id) {
    return _updateGroup(board, group)
  } else {
    return _addGroup(board, group)
  }
}

function getGroupById(board, groupId) {
  const group = board.groups.find(group => group.id === groupId)
  return group
}

function _addGroup(board, group) {
  group.id = utilService.makeId()
  board.groups.push(group)
  return save(board)
}

function _updateGroup(board, group) {
  const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id)
  if (groupIdx < 0) {
    throw new Error(`Update failed, cannot find group with id: ${group.id}`)
  }
  board.groups.splice(groupIdx, 1, group)
  return save(board)
}

// * --------------------------------- TASKS ---------------------------------

function removeTask(board, group, taskId) {
  const taskIdx = group.tasks.findIndex(task => task.id === taskId)
  if (taskId < 0) {
    throw new Error(`Update failed, cannot find task with id: ${taskId}`)
  }
  group.tasks.splice(taskIdx, 1)
  return save(board)
}

function saveTask(board, group, task, unshift) {
  // console.log(task)
  if (task.id) {
    return _updateTask(board, group, task)
  } else {
    return _addTask(board, group, task, unshift)
  }
}

function getTaskById(board, taskId) {
  const taskGroup = board.groups.find(group => group.tasks.some(t => t.id === taskId))
  if (!taskGroup) throw new Error('Cannot find tasks in board')

  const task = taskGroup.tasks.find(currTask => currTask.id === taskId)
  return [taskGroup, task]
}

function _addTask(board, group, task, unshift = false) {
  task.id = utilService.makeId()
  unshift ? group.tasks.unshift(task) : group.tasks.push(task)
  return save(board)
}

function _updateTask(board, group, task) {
  const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
  if (taskIdx < 0) {
    throw new Error(`Update failed, cannot find task with id: ${task.id}`)
  }
  group.tasks.splice(taskIdx, 1, task)
  return saveGroup(board, group)
}

function getGroupColors() {
  return [
    'rgb(3, 127, 76)',
    'rgb(0, 200, 117)',
    'rgb(156, 211, 38)',
    'rgb(202, 182, 65)',
    'rgb(255, 203, 0)',
    'rgb(120, 75, 209)',
    'rgb(157, 80, 221)',
    'rgb(0, 126, 181)',
    'rgb(87, 155, 252)',
    'rgb(102, 204, 255)',
    'rgb(187, 51, 84)',
    'rgb(223, 47, 74)',
    'rgb(255, 0, 127)',
    'rgb(255, 90, 196)',
    'rgb(255, 100, 46)',
    'rgb(127, 83, 71)',
    'rgb(196, 196, 196)',
    'rgb(117, 117, 117)',
  ]
}

function getEmptyComment() {
  return {
    txt: '',
    byPerson: null,
    createdAt: null,
    id: null,
  }
}

////////////////////////////////////////////////////

function _sortByPersons(board, group, sortBy) {
  const tasksWithFullUsers = group.tasks.map(task => {
    let taskFullPersons = []

    if (task.personsIds && task.personsIds.length) {
      taskFullPersons = task.personsIds.map(id => getPerson(board, id))
    } else {
      taskFullPersons = [{ fullName: 'zzzzz' }]
    }

    return { ...task, taskFullPersons }
  })

  tasksWithFullUsers.forEach(task =>
    task.taskFullPersons?.sort((p1, p2) => p1.fullName.localeCompare(p2.fullName))
  )

  const sortedTasks = tasksWithFullUsers.sort(
    (t1, t2) =>
      t1.taskFullPersons[0].fullName.localeCompare(t2.taskFullPersons[0].fullName) * sortBy.person
  )

  sortedTasks.forEach(task => delete task.personsDetails)
  return sortedTasks
}

// * --------------------------------- DEMO DATA ---------------------------------

function _createDemoBoard() {
  let boards = utilService.loadFromStorage(BOARDS_KEY)

  if (!boards || !boards.length) {
    boards = []

    const board = {
      _id: 'b101',
      title: 'Electric Store Project',
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
        {
          id: 'u104',
          fullName: 'John Doe',
          imgUrl: '',
        },
      ],
      priorities: [
        {
          id: 'pri101',
          title: `Critical \u{26A0}`,
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
          title: 'Frontend',
          archivedAt: null,
          tasks: [
            {
              id: 'p101',
              title: 'Implement responsive design for user dashboard',
              personsIds: ['u101'],
              status: 'Working on it',
              priority: 'High',
              timeline: {
                startDate: 1712077970111,
                dueDate: 1712250770111,
              },
              comments: [
                {
                  id: 'ZdPnm',
                  txt: 'also @yaronb please CR this',
                  createdAt: 1590999817436,
                  byPerson: {
                    id: 'u101',
                    fullName: 'Atar Mor',
                    imgUrl:
                      'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/atar_ofxln7.jpg',
                  },
                },
              ],
              activities: [
                {
                  id: utilService.makeId(),
                  action: 'Add person',
                  personAdded: {
                    id: 'u103',
                    fullName: 'Ron Felsenfeld',
                    imgUrl:
                      'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/ron_hzfvru.jpg',
                  },
                  createdAt: 1712995031424,
                  byPerson: {
                    id: 'u101',
                    fullName: 'Atar Mor',
                    imgUrl:
                      'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/atar_ofxln7.jpg',
                  },
                },
                // {
                //   id: utilService.makeId(),
                //   action: "Change date",
                //   changedDate:{

                //   },
                //   createdAt: 1712995031424,
                //   byPerson: {
                //     id: 'u101',
                //     fullName: 'Atar Mor',
                //     imgUrl:
                //       'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/atar_ofxln7.jpg',
                //   },
                // },
              ],
            },
            {
              id: 'p102',
              title: 'Add drag-and-drop functionality',
              personsIds: ['u103'],
              status: 'Stuck',
              priority: 'Medium',
              timeline: {
                startDate: 1712164370111,
                dueDate: 1712941970111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't103',
              title: 'Create modal for adding new tasks',
              personsIds: ['u101', 'u102', 'u103'],
              status: 'Working on it',
              priority: 'High',
              timeline: {
                startDate: 1711991570111,
                dueDate: 1712337170111,
              },
              comments: [],
              activities: [],
              files: [
                {
                  type: 'pdf',
                  url: 'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1713011807/or7snd8m1oxfh93v9wro.pdf',
                  desc: 'How to modal',
                },
              ],
            },
            {
              id: 't104',
              title: 'Integrate notification system for task updates',
              personsIds: ['u101', 'u102'],
              status: 'Done',
              priority: `Critical \u{26A0}`,
              timeline: {
                startDate: 1711991570111,
                dueDate: 1712077970111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't105',
              title: 'Develop search functionality for tasks',
              priority: 'Low',
              timeline: {
                startDate: 1712337170111,
                dueDate: 1712509970111,
              },
              files: [
                {
                  type: 'png',
                  url: 'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1713015920/gwh32kdm0guszyuv8nqb.png',
                  desc: 'your-canvas.png',
                },
                {
                  type: 'jpg',
                  url: 'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1713019203/uc8cbiodqflqhewr2f8d.jpg',
                  desc: 'how to',
                },
              ],
              comments: [],
              activities: [],
            },
            {
              id: 't106',
              title: 'Add color-coded labels for task prioritization',
              personsIds: ['u101', 'u103'],
              status: 'Done',
              priority: 'High',
              timeline: {
                startDate: 1711991570111,
                dueDate: 1712164370111,
              },
              comments: [],
              activities: [],
            },
          ],
          style: {
            color: '#579bfc',
          },
        },
        {
          id: 'g2',
          title: 'Backend',
          archivedAt: null,
          tasks: [
            {
              id: 't201',
              title: 'Implement user registration and login functionality',
              personsIds: ['u101', 'u103'],
              status: 'Working on it',
              priority: 'High',
              timeline: {
                startDate: 1711991570111,
                dueDate: 1712337170111,
              },
              comments: [],
              activities: [],
              files: [
                {
                  type: 'jpg',
                  url: 'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1713019203/uc8cbiodqflqhewr2f8d.jpg',
                  desc: 'how to',
                },
              ],
            },
            {
              id: 't202',
              title: 'Develop RESTful API',
              personsIds: ['u102'],
              status: 'Done',
              priority: `Critical \u{26A0}`,
              timeline: {
                startDate: 1711991570111,
                dueDate: 1712164370111,
              },
              files: [
                {
                  type: 'pdf',
                  url: 'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1713012001/r1u6pqgfhrbrj0mlxpiv.pdf',
                  desc: 'Forme 1.png',
                },
              ],
              comments: [],
              activities: [],
            },
            {
              id: 't203',
              title: 'Create database schema for storing user and task data',
              priority: 'Medium',
              timeline: {
                startDate: 1712164370111,
                dueDate: 1713114770111,
              },
            },
            {
              id: 't204',
              title: 'Implement email notification',
              personsIds: ['u101', 'u104'],
              status: 'Stuck',
              priority: 'Low',
              timeline: {
                startDate: 1712077970111,
                dueDate: 1712250770111,
              },
              files: [
                {
                  type: 'jpg',
                  url: 'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1712904587/qnwqevnelnowqrbaeisv.jpg',
                  desc: '11210022.JPG',
                },
              ],
              comments: [],
              activities: [],
            },
            {
              id: 't205',
              title: 'Integrate third-party authentication',
              personsIds: ['u102'],
              status: 'Done',
              priority: 'High',
              timeline: {
                startDate: 1711991570111,
                dueDate: 1712250770111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't206',
              title: 'Implement data analytics dashboard',
              personsIds: ['u101'],
              priority: 'High',
              timeline: {
                startDate: 1712164370111,
                dueDate: 1713028370111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't207',
              title: 'Develop user profile management functionality',
              personsIds: ['u101', 'u102', 'u103'],
              status: 'Stuck',
              timeline: {
                startDate: 1712077970111,
                dueDate: 1712250770111,
              },
              comments: [],
              activities: [],
            },
          ],
          style: {
            color: '#037f4c',
          },
        },
        {
          id: 'g3',
          title: 'Design',
          archivedAt: null,
          tasks: [
            {
              id: 't301',
              title: 'Design intuitive user interface for task management',
              personsIds: ['u103'],
              status: 'Done',
              priority: 'High',
              timeline: {
                startDate: 1712077970111,
                dueDate: 1712164370111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't302',
              title: 'Create icons for task categories',
              personsIds: ['u101'],
              status: 'Stuck',
              priority: `Critical \u{26A0}`,
              timeline: {
                startDate: 1712164370111,
                dueDate: 1712337170111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't303',
              title: 'Design user onboarding flow for new users',
              personsIds: ['u101', 'u102', 'u103'],
              priority: 'Low',
              timeline: {
                startDate: 1712077970111,
                dueDate: 1712337170111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't304',
              title: 'Create wireframes for task detail view',
              personsIds: ['u102'],
              status: 'Done',
              priority: 'Low',
              timeline: {
                startDate: 1712077970111,
                dueDate: 1712164370111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't305',
              title: 'Design email templates for notifications and reminders',
              priority: 'Medium',
              timeline: {
                startDate: 1712337170111,
                dueDate: 1712337170111,
              },
              comments: [],
              activities: [],
              files: [
                {
                  type: 'png',
                  url: 'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1713018403/cyz8y7v0hkz96tyziafy.png',
                  desc: 'How to email templates',
                },
              ],
            },
            {
              id: 't306',
              title: 'Create mockups for mobile and tablet versions of the app',
              status: 'Working on it',
              priority: 'High',
              timeline: {
                startDate: 1712077970111,
                dueDate: 1712423570111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't307',
              title: 'Design color palette and typography for the interface',
              personsIds: ['u103', 'u104'],
              timeline: {
                startDate: 1712855570111,
                dueDate: 1713114770111,
              },
              files: [
                {
                  type: 'png',
                  url: 'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1713019203/uc8cbiodqflqhewr2f8d.jpg',
                  desc: 'Color pallete',
                },
              ],
              comments: [],
              activities: [],
            },
            {
              id: 't308',
              title: 'Create illustrations for empty states (e.g., empty task list)',
              personsIds: ['u101'],
              status: 'Done',
              priority: `Critical \u{26A0}`,
              timeline: {
                startDate: 1711991570111,
                dueDate: 1712164370111,
              },
              comments: [],
              activities: [],
            },
          ],
          style: {
            color: '#9d50dd',
          },
        },
        {
          id: 'g4',
          title: 'Bugs',
          archivedAt: null,
          tasks: [
            {
              id: 't401',
              title: 'Fix issue with task duplication when editing',
              personsIds: ['u101'],
              status: 'Stuck',
              priority: 'Low',
              timeline: {
                startDate: 1712164370111,
                dueDate: 1712337170111,
              },
              comments: [],
              activities: [],
              files: [
                {
                  type: 'pdf',
                  url: 'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1713012001/r1u6pqgfhrbrj0mlxpiv.pdf',
                  desc: 'how to fix bugs',
                },
              ],
            },
            {
              id: 't402',
              title: 'Resolve performance issues with loading large task lists',
              personsIds: ['u102', 'u103'],
              status: 'Done',
              priority: 'Medium',
              timeline: {
                startDate: 1712077970111,
                dueDate: 1712164370111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't403',
              title: 'Fix UI glitch causing overlapping elements on mobile devices',
              priority: 'Medium',
              timeline: {
                startDate: 1712164370111,
                dueDate: 1712250770111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't404',
              title: 'Fix alignment issue on task cards',
              personsIds: ['u102'],
              status: 'Working on it',
              priority: 'High',
              timeline: {
                startDate: 1712077970111,
                dueDate: 1712337170111,
              },
              comments: [],
              activities: [],
            },
          ],
          style: {
            color: '#df2f4a',
          },
        },
        {
          id: 'g5',
          title: 'Refactor',
          archivedAt: null,
          tasks: [
            {
              id: 't501',
              title: 'Refactor CSS code for improved readability',
              personsIds: ['u103'],
              priority: 'Medium',
              timeline: {
                startDate: 1712337170111,
                dueDate: 1712509970111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't502',
              title: 'Refactor component structure for better code organization',
              personsIds: ['u101'],
              status: 'Done',
              priority: 'High',
              timeline: {
                startDate: 1712077970111,
                dueDate: 1712164370111,
              },
              comments: [],
              activities: [],
            },
            {
              id: 't503',
              title: 'Optimize API calls',
              personsIds: ['u102'],
              status: 'Working on it',
              priority: 'Low',
              timeline: {
                startDate: 1712077970111,
                dueDate: 1712423570111,
              },
              comments: [],
              activities: [],
            },
          ],
          style: {
            color: '#fdab3d',
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
        'PersonPicker',
        'StatusPicker',
        'PriorityPicker',
        'TimelinePicker',
        'FilesPicker',
      ],
    }

    boards.push(board)
    utilService.saveToStorage(BOARDS_KEY, boards)
  }
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
        title: `Critical \u{26A0}`,
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
        id: utilService.makeId(),
        title: 'Group1',
        archivedAt: null,
        tasks: [
          {
            id: utilService.makeId(),
            title: 'task 1',
            personsIds: ['u101'],
            status: 'Working on it',
            timeline: {
              startDate: 1712077970111,
              dueDate: 1712250770111,
            },
            comments: [],
            activities: [],
          },
          {
            id: utilService.makeId(),
            title: 'task 2',
            personsIds: ['u103'],
            status: 'Done',
            timeline: {
              startDate: 1712164370111,
              dueDate: 1712941970111,
            },
            comments: [],
            activities: [],
          },
          {
            id: utilService.makeId(),
            title: 'task 3',
            personsIds: ['u101', 'u102', 'u103'],
            status: 'Stuck',
            timeline: {
              startDate: 1711991570111,
              dueDate: 1712337170111,
            },
            comments: [],
            activities: [],
            files: [
              {
                type: 'jpg',
                url: 'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1713019203/uc8cbiodqflqhewr2f8d.jpg',
                desc: 'How to modal',
              },
            ],
          },
        ],
        style: {
          color: '#579bfc',
        },
      },
      {
        id: utilService.makeId(),
        title: 'group 2',
        archivedAt: null,
        tasks: [
          {
            id: utilService.makeId(),
            title: 'task 1',
            personsIds: ['u101', 'u103'],
            timeline: {
              startDate: 1711991570111,
              dueDate: 1712337170111,
            },
            comments: [],
            activities: [],
            files: [
              {
                type: 'jpg',
                url: 'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1713006218/nbgwkn5rga3yqmqc1tk9.jpg',
                desc: 'how to',
              },
            ],
          },
          {
            id: utilService.makeId(),
            title: 'task 2',
            personsIds: ['u102'],
            status: 'Stuck',
            timeline: {
              startDate: 1711991570111,
              dueDate: 1712164370111,
            },
            comments: [],
            activities: [],
            files: [
              {
                type: 'pdf',
                url: 'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1713011807/or7snd8m1oxfh93v9wro.pdf',
                desc: 'Forme 1.png',
              },
            ],
          },
        ],
        style: {
          color: '#037f4c',
        },
      },
    ],
    activities: [],
    cmpsOrder: ['PersonPicker', 'StatusPicker', 'PriorityPicker', 'TimelinePicker'],
  }
}

function getEmptyTask() {
  return {
    title: '',
    personsId: [],
    comments: [],
    activities: [],
  }
}

function getEmptyGroup() {
  return {
    title: 'New Group',
    archivedAt: null,
    tasks: [],
    style: {
      color: _getRandGroupColor(),
    },
  }
}

function _getRandGroupColor() {
  const groupColors = [
    'rgb(3, 127, 76)',
    'rgb(0, 200, 117)',
    'rgb(156, 211, 38)',
    'rgb(202, 182, 65)',
    'rgb(255, 203, 0)',
    'rgb(120, 75, 209)',
    'rgb(0, 126, 181)',
    'rgb(87, 155, 252)',
    'rgb(102, 204, 255)',
    'rgb(187, 51, 84)',
    'rgb(223, 47, 74)',
    'rgb(255, 0, 127)',
    'rgb(255, 90, 196)',
    'rgb(255, 100, 46)',
    'rgb(127, 83, 71)',
    'rgb(196, 196, 196)',
    'rgb(117, 117, 117)',
  ]

  return groupColors[utilService.getRandomIntInclusive(0, groupColors.length - 1)]
}
