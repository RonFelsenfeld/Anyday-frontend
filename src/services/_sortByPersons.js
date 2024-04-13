////////////////////////////////////////////////////
export function _sortByPersons(board, group, sortBy) {
  const tasksWithFullUsers = group.tasks.map(task => {
    const persons = task.personsIds?.map(id => {
      const user = board.persons.find(p => p.id === id)
      return user
    })

    return { ...task, persons }
  })
  // console.log(tasksWithFullUsers)
  tasksWithFullUsers.forEach(task => {
    task.persons?.sort((p1, p2) => p1.fullName.localeCompare(p2.fullName))
  })

  const sortedTasks = tasksWithFullUsers.sort((t1, t2) => {
    if ((!t1.persons || !t1.persons?.length) && sortBy.person > 0) {
      console.log('guest')
      return -1
    }
    if ((!t1.persons || !t1.persons?.length) && sortBy.person < 0) return 1
    if ((!t2.persons || !t2.persons?.length) && sortBy.person > 0) return -1
    if ((!t2.persons || !t2.persons?.length) && sortBy.person < 0) return 1

    t1.persons[0]?.fullName.localeCompare(t2.persons[0]?.fullName) * sortBy.person
  })

  sortedTasks.forEach(task => delete task.persons)
  return sortedTasks
}
