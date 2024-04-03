import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const BOARDS_KEY = 'boardDB'
_createDemoBoard()

export const boardService = {
  query,
  getById,
  remove,
  save,
}

function query() {
  return storageService.query(BOARDS_KEY)
    .then(boards => boards)
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

function _createDemoBoard() {
  let board = utilService.loadFromStorage(BOARDS_KEY)

  if (!board) {
    board = {
      _id: 'b12345',
      title: 'Electric Store Project',
      isStarred: false,
      archivedAt: null,
      // createdBy: {
      //   _id: utilService.makeId(),
      //   fullName: 'Atar Mor',
      //   imgUrl: 'http://some-img',
      // },
      statuses: [
        { id: utilService.makeId(), title: 'Done', color: '#00c875' },
        { id: utilService.makeId(), title: 'Working on it', color: '#fdab3d' },
        { id: utilService.makeId(), title: 'Stuck', color: '#df2f4a' },
        { id: utilService.makeId(), title: '', color: '#c4c4c4' },
      ],
      persons: [
        { id: 'u101', fullName: 'Atar Mor', imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/atar_ofxln7.jpg' },
        { id: 'u102', fullName: 'Ido Yotvat', imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168994/ido_ds25mn.jpg' },
        { id: 'u103', fullName: 'Ron Felsenfeld', imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/ron_hzfvru.jpg' },
      ],
      priorities: [
        { id: utilService.makeId(), title: 'Critical', color: '#333333' },
        { id: utilService.makeId(), title: 'High', color: '#401694' },
        { id: utilService.makeId(), title: 'Medium', color: '#5559df' },
        { id: utilService.makeId(), title: 'Low', color: '#579bfc' },
        { id: utilService.makeId(), title: '', color: '#c4c4c4' },
      ],
      groups: [
        {
          id: 'group1',
          title: 'Frontend',
          archivedAt: null,
          tasks: [
            {
              id: utilService.makeId(),
              title: 'Replace logo',
              status: 'Stuck',
              priority: 'Low',
            },
            {
              id: utilService.makeId(),
              title: 'Add Samples',
              status: 'Working on it',
              priority: 'Critical',
            },
          ],
          style: { color: '#579bfc' },
        },
        {
          id: utilService.makeId(),
          title: 'Backend',
          archivedAt: null,
          tasks: [
            {
              id: 'task1',
              title: 'Develop RESTful API',
              status: 'Done',
              priority: 'High',
              personsIds: ['u101', 'u102'],
              timeline: {
                startDate: Date.now(),
                dueDate: Date.now() + 1000 * 60 * 60 * 24
              }
            },
            {
              id: utilService.makeId(),
              title: 'Connect sockets',
              status: 'Working on it',
              priority: 'Low',
            },
          ],
          style: { color: '#037f4c' },
        },
      ],
      activities: [
        {
          id: utilService.makeId(),
          txt: 'Changed Color',
          createdAt: Date.now(),
          byPerson: {
            _id: 'u101',
            fullName: 'Atar Mor',
            imgUrl: 'http://some-img',
          },
          group: {
            id: 'group1',
            title: 'Frontend',
          },
          task: {
            id: 'task1',
            title: 'Replace Logo',
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

    const boards = []
    boards.push(board)
    utilService.saveToStorage(BOARDS_KEY, boards)
  }
}
