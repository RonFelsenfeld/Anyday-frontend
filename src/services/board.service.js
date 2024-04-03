import { utilService } from './util.service'

const STORAGE_KEY = 'boardDB'
_createDemoBoard()

export const boardService = {}

function _createDemoBoard() {
  let board = utilService.loadFromStorage(STORAGE_KEY)

  if (!board) {
    board = {
      _id: utilService.makeId(),
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
        { id: 'u101', fullName: 'Atar Mor', imgUrl: 'http://some-img' },
        { id: 'u102', fullName: 'Ido Yotvat', imgUrl: 'http://some-img' },
        { id: 'u103', fullName: 'Ron Felsenfeld', imgUrl: 'http://some-img' },
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
              personsIds: ['u101, u102'],
              startDate: Date.now(),
              dueDate: Date.now() + 1000 * 60 * 60 * 24,
              byPerson: {
                _id: 'u101',
                username: 'Atar',
                fullname: 'Atar Mor',
                imgUrl: 'http://some-img',
              },
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

    utilService.saveToStorage(STORAGE_KEY, board)
  }
}
