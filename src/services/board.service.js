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
  getGroupById,
  removeGroup,
  saveGroup,
  removeTask,
  saveTask,
  getEmptyTask,
  getEmptyBoard,
  getEmptyGroup,
  getPerson,
  getPersonUrl,
  getTotalTasksByBoard,
  getColTitle,
  getGroupColors,
  getTaskById,
  filterBoard,
}

async function query(boardFilterBy) {
  try {
    var boards = await storageService.query(BOARDS_KEY)
    var boardsToReturn = boards.slice()
    const regExp = new RegExp(boardFilterBy.txt, 'i')
    boardsToReturn = boardsToReturn.filter(board => regExp.test(board.title))

    return boardsToReturn

  } catch (err) {
    console.log(err);
    throw new Error(err)
  }
  // boards = boards.map(({ _id, title, imgUlr }) => ({ _id, title, imgUlr }))
}

async function getById(boardId) {
  var board = await storageService.get(BOARDS_KEY, boardId)
  return board
}

function filterBoard(board, filterBy) {

  let groupsToReturn = board.groups.slice();

  if (filterBy.txt) {
    const regExp = new RegExp(filterBy.txt, 'i');

    const groupsFilteredByTitle = groupsToReturn.filter(group => regExp.test(group.title));

    const filteredTasksGroups = groupsToReturn.filter(group => group.tasks?.some(t => regExp.test(t.title)));
    const filteredAll = filteredTasksGroups.map(group => {
      const filteredGroup = group.tasks.filter(t => regExp.test(t.title));
      return { ...group, tasks: filteredGroup };
    });

    groupsToReturn = [...groupsFilteredByTitle, ...filteredAll];
  }

  if (filterBy.person) {
    const personGroups = groupsToReturn.filter(group => group.tasks.some(t => t.personsIds?.includes(filterBy.person)));
    const groupWithPersonTasks = personGroups.map(group => {
      const filteredGroup = group.tasks.filter(t => t.personsIds?.includes(filterBy.person));
      return { ...group, tasks: filteredGroup };
    });

    groupsToReturn = [...groupWithPersonTasks];
  }

  // Remove duplicate groups
  groupsToReturn = groupsToReturn.reduce((unique, item) => {
    return unique.some(u => u.id === item.id) ? unique : [...unique, item];
  }, []);
  return groupsToReturn

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
    case 'PersonsPicker':
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
  return task
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
    byPerson: {
      id: 'u102',
      fullName: 'Ido Yotvat',
      imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168994/ido_ds25mn.jpg',
    },
    createdAt: utilService.getRandomTimestamp()
  }
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
              id: 't101',
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
                  id: "ZdPnm",
                  txt: "also @yaronb please CR this",
                  createdAt: 1590999817436,
                  byPerson: {
                    id: 'u101',
                    fullName: 'Atar Mor',
                    imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/atar_ofxln7.jpg',
                  },
                },
              ]
            },
            {
              id: 't102',
              title: 'Add drag-and-drop functionality',
              personsIds: ['u103'],
              status: 'Stuck',
              priority: 'Medium',
              timeline: {
                startDate: 1712164370111,
                dueDate: 1712941970111,
              },
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
              files: {
                type: 'url',
                url: 'https://www.w3schools.com/howto/howto_css_modals.asp',
                desc: 'How to modal',
              },
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
            },
            {
              id: 't105',
              title: 'Develop search functionality for tasks',
              priority: 'Low',
              timeline: {
                startDate: 1712337170111,
                dueDate: 1712509970111,
              },
              files: {
                type: 'img',
                url: 'https://someImgUrl',
                desc: 'your-canvas.png',
              },
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
              files: {
                type: 'url',
                url: 'https://www.youtube.com/watch?v=1BfCnjr_Vjg&t=229s',
                desc: 'how to',
              },
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
              files: {
                type: 'img',
                url: 'https://someImgUrl',
                desc: 'Forme 1.png',
              },
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
              files: {
                type: 'img',
                url: 'https://someImgUrl',
                desc: '11210022.JPG',
              },
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
            },
            {
              id: 't305',
              title: 'Design email templates for notifications and reminders',
              priority: 'Medium',
              timeline: {
                startDate: 1712337170111,
                dueDate: 1712337170111,
              },
              files: {
                type: 'url',
                url: 'https://www.mailjet.com/solutions/use-cases/newsletter-templates/?utm_source=google&utm_medium=cpc&utm_campaign=EU%20%7C%20EN%20%7C%20Search%20%7C%20NewsLetter&utm_id=20307673600&utm_content=154296662367&utm_term=newsletter%20templates&utm_term=newsletter%20templates&utm_campaign=20307673600&utm_content=&utm_source=google&utm_medium=cpc&creative=663440392699&keyword=newsletter%20templates&matchtype=b&network=g&device=c&gad_source=1&gclid=CjwKCAjw_LOwBhBFEiwAmSEQATtbImo87GYIN6ZPwCBb_rK-Q2CQgHQh0K8bSbCqP5y99Ix5foPpHBoC2g0QAvD_BwE',
                desc: 'How to email templates',
              },
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
            },
            {
              id: 't307',
              title: 'Design color palette and typography for the interface',
              personsIds: ['u103', 'u104'],
              timeline: {
                startDate: 1712855570111,
                dueDate: 1713114770111,
              },
              files: {
                type: 'url',
                url: 'https://colorhunt.co/',
                desc: 'Color pallete',
              },
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
              files: {
                type: 'url',
                url: 'https://jamie-burns.medium.com/a-short-guide-to-fixing-bugs-in-software-764fc31bb0e5',
                desc: 'how to fix bugs',
              },
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
            },
            {
              id: 't403',
              title: 'Fix UI glitch causing overlapping elements on mobile devices',
              priority: 'Medium',
              timeline: {
                startDate: 1712164370111,
                dueDate: 1712250770111,
              },
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
            files: {
              type: 'url',
              url: 'https://www.w3schools.com/howto/howto_css_modals.asp',
              desc: 'How to modal',
            },
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
            files: {
              type: 'url',
              url: 'https://www.youtube.com/watch?v=1BfCnjr_Vjg&t=229s',
              desc: 'how to',
            },
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
            files: {
              type: 'img',
              url: 'https://someImgUrl',
              desc: 'Forme 1.png',
            },
          },
        ],
        style: {
          color: '#037f4c',
        },
      },
    ],
    activities: [],
    cmpsOrder: ['PersonsPicker', 'StatusPicker', 'PriorityPicker', 'TimelinePicker'],
  }
}

function getEmptyTask() {
  return {
    title: '',
    personsId: [],
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
