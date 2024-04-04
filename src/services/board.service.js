import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const BOARDS_KEY = 'boardDB'
_createDemoBoard()

export const boardService = {
  query,
  getById,
  remove,
  save,
  removeGroup,
  saveGroup,
  removeTask,
  saveTask
}

function query() {
  return storageService.query(BOARDS_KEY).then(boards => boards)
}

function getById(boardId) {
  return storageService.get(BOARDS_KEY, boardId)
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


/// GROUPS ///

function removeGroup(board, groupId) {
  const groupIdx = board.groups.findIndex(group => group.id === groupId)
  if (groupIdx < 0) {
    throw new Error(`Update failed, cannot find group with id: ${groupId}`)
  }
  board.groups.splice(groupIdx, 1)
  save(board)
}

function saveGroup(board, group) {
  if (group.id) {
    _updateGroup(board, group)
  } else {
    _addGroup(board, group)
  }
}

function _getGroupById(board, groupId) {
  const group = board.groups.find(group => group.id === groupId)
  return group
}

function _addGroup(board, group) {
  group.id = utilService.makeId()
  board.groups.push(group)
  save(board)
}

function _updateGroup(board, group) {
  const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id)
  if (groupIdx < 0) {
    throw new Error(`Update failed, cannot find group with id: ${group.id}`)
  }
  board.groups.splice(groupIdx, 1, group)
  save(board)
}


/// TASKS ///

function removeTask(board, group, taskId) {
  const taskIdx = group.tasks.findIndex(task => task.id === taskId)
  if (taskId < 0) {
    throw new Error(`Update failed, cannot find task with id: ${taskId}`)
  }
  group.tasks.splice(taskIdx, 1)
  save(board)
}

function saveTask(board, group, task) {
  if (task.id) {
    _updateTask(board, group, task)
  } else {
    _addTask(board, group, task)
  }
}

function _getTaskById(group, taskId) {
  const task = group.tasks.find(task => task.id === taskId)
  return task
}

function _addTask(board, group, task) {
  task.id = utilService.makeId()
  group.tasks.push(task)
  save(board)
}

function _updateTask(board, group, task) {
  const taskIdx = group.tasks.findIndex(currTask => currTask.id === task.id)
  if (taskIdx < 0) {
    throw new Error(`Update failed, cannot find task with id: ${task.id}`)
  }
  group.tasks.splice(taskIdx, 1, task)
  save(board)
}


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
                startDate: 1712077970,
                dueDate: 1712250770,
              },
            },
            {
              id: 't102',
              title: 'Add drag-and-drop functionality',
              personsIds: ['u103'],
              status: 'Stuck',
              priority: 'Medium',
              timeline: {
                startDate: 1712164370,
                dueDate: 1712941970,
              },
            },
            {
              id: 't103',
              title: 'Create modal for adding new tasks',
              personsIds: ['u101', 'u102', 'u103'],
              status: 'Working on it',
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
            },
            {
              id: 't104',
              title: 'Integrate notification system for task updates',
              personsIds: ['u101', 'u102'],
              status: 'Done',
              priority: 'Critical',
              timeline: {
                startDate: 1711991570,
                dueDate: 1712077970,
              },
            },
            {
              id: 't105',
              title: 'Develop search functionality for tasks',
              priority: 'Low',
              timeline: {
                startDate: 1712337170,
                dueDate: 1712509970,
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
                startDate: 1711991570,
                dueDate: 1712164370,
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
              id: 't101',
              title: 'Implement user registration and login functionality',
              personsIds: ['u101', 'u103'],
              status: 'Working on it',
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
              title: 'Develop RESTful API',
              personsIds: ['u102'],
              status: 'Done',
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
            },
            {
              id: 't103',
              title: 'Create database schema for storing user and task data',
              priority: 'Medium',
              timeline: {
                startDate: 1712164370,
                dueDate: 1713114770,
              },
            },
            {
              id: 't104',
              title: 'Implement email notification',
              personsIds: ['u101'],
              status: 'Stuck',
              priority: 'Low',
              timeline: {
                startDate: 1712077970,
                dueDate: 1712250770,
              },
              files: {
                type: 'img',
                url: 'https://someImgUrl',
                desc: '11210022.JPG',
              },
            },
            {
              id: 't105',
              title: 'Integrate third-party authentication',
              personsIds: ['u102'],
              status: 'Done',
              priority: 'High',
              timeline: {
                startDate: 1711991570,
                dueDate: 1712250770,
              },
            },
            {
              id: 't106',
              title: 'Implement data analytics dashboard',
              personsIds: ['u101'],
              priority: 'High',
              timeline: {
                startDate: 1712164370,
                dueDate: 1713028370,
              },
            },
            {
              id: 't107',
              title: 'Develop user profile management functionality',
              personsIds: ['u101', 'u102', 'u103'],
              status: 'Stuck',
              timeline: {
                startDate: 1712077970,
                dueDate: 1712250770,
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
              id: 't101',
              title: 'Design intuitive user interface for task management',
              personsIds: ['u103'],
              status: 'Done',
              priority: 'High',
              timeline: {
                startDate: 1712077970,
                dueDate: 1712164370,
              },
            },
            {
              id: 't102',
              title: 'Create icons for task categories',
              personsIds: ['u101'],
              status: 'Stuck',
              priority: 'Critical',
              timeline: {
                startDate: 1712164370,
                dueDate: 1712337170,
              },
            },
            {
              id: 't103',
              title: 'Design user onboarding flow for new users',
              personsIds: ['u101', 'u102', 'u103'],
              priority: 'Low',
              timeline: {
                startDate: 1712077970,
                dueDate: 1712337170,
              },
            },
            {
              id: 't104',
              title: 'Create wireframes for task detail view',
              personsIds: ['u102'],
              status: 'Done',
              priority: 'Low',
              timeline: {
                startDate: 1712077970,
                dueDate: 1712164370,
              },
            },
            {
              id: 't105',
              title: 'Design email templates for notifications and reminders',
              priority: 'Medium',
              timeline: {
                startDate: 1712337170,
                dueDate: 1712337170,
              },
              files: {
                type: 'url',
                url: 'https://www.mailjet.com/solutions/use-cases/newsletter-templates/?utm_source=google&utm_medium=cpc&utm_campaign=EU%20%7C%20EN%20%7C%20Search%20%7C%20NewsLetter&utm_id=20307673600&utm_content=154296662367&utm_term=newsletter%20templates&utm_term=newsletter%20templates&utm_campaign=20307673600&utm_content=&utm_source=google&utm_medium=cpc&creative=663440392699&keyword=newsletter%20templates&matchtype=b&network=g&device=c&gad_source=1&gclid=CjwKCAjw_LOwBhBFEiwAmSEQATtbImo87GYIN6ZPwCBb_rK-Q2CQgHQh0K8bSbCqP5y99Ix5foPpHBoC2g0QAvD_BwE',
                desc: 'How to email templates',
              },
            },
            {
              id: 't106',
              title: 'Create mockups for mobile and tablet versions of the app',
              status: 'Working on it',
              priority: 'High',
              timeline: {
                startDate: 1712077970,
                dueDate: 1712423570,
              },
            },
            {
              id: 't107',
              title: 'Design color palette and typography for the interface',
              personsIds: ['u103'],
              timeline: {
                startDate: 1712855570,
                dueDate: 1713114770,
              },
              files: {
                type: 'url',
                url: 'https://colorhunt.co/',
                desc: 'Color pallete',
              },
            },
            {
              id: 't108',
              title: 'Create illustrations for empty states (e.g., empty task list)',
              personsIds: ['u101'],
              status: 'Done',
              priority: 'Critical',
              timeline: {
                startDate: 1711991570,
                dueDate: 1712164370,
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
              id: 't101',
              title: 'Fix issue with task duplication when editing',
              personsIds: ['u101'],
              status: 'Stuck',
              priority: 'Low',
              timeline: {
                startDate: 1712164370,
                dueDate: 1712337170,
              },
              files: {
                type: 'url',
                url: 'https://jamie-burns.medium.com/a-short-guide-to-fixing-bugs-in-software-764fc31bb0e5',
                desc: 'how to fix bugs',
              },
            },
            {
              id: 't102',
              title: 'Resolve performance issues with loading large task lists',
              personsIds: ['u102', 'u103'],
              status: 'Done',
              priority: 'Medium',
              timeline: {
                startDate: 1712077970,
                dueDate: 1712164370,
              },
            },
            {
              id: 't103',
              title: 'Fix UI glitch causing overlapping elements on mobile devices',
              priority: 'Medium',
              timeline: {
                startDate: 1712164370,
                dueDate: 1712250770,
              },
            },
            {
              id: 't104',
              title: 'Fix alignment issue on task cards',
              personsIds: ['u102'],
              status: 'Working on it',
              priority: 'High',
              timeline: {
                startDate: 1712077970,
                dueDate: 1712337170,
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
              id: 't101',
              title: 'Refactor CSS code for improved readability',
              personsIds: ['u103'],
              priority: 'Medium',
              timeline: {
                startDate: 1712337170,
                dueDate: 1712509970,
              },
            },
            {
              id: 't102',
              title: 'Refactor component structure for better code organization',
              personsIds: ['u101'],
              status: 'Done',
              priority: 'High',
              timeline: {
                startDate: 1712077970,
                dueDate: 1712164370,
              },
            },
            {
              id: 't103',
              title: 'Optimize API calls',
              personsIds: ['u102'],
              status: 'Working on it',
              priority: 'Low',
              timeline: {
                startDate: 1712077970,
                dueDate: 1712423570,
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
