import { useEffect, useRef, useState } from 'react'

import { GroupHeader } from './GroupHeader'
import { TaskList } from './TaskList'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

export function GroupPreview({
  group,
  isHeaderExpanded,
  onAddGroup,
  onRemoveGroup,
  setGroupToEdit,
  groupToEdit,
  snapshot,
  idx,
  draggableDOMref,
  isAllGroupsExpended,
  setIsAllGroupsExpended,
  // markedTxt
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const prevIsExpandedRef = useRef(true)

  useEffectUpdate(() => {
    if (!snapshot.isDraggingOver) setIsExpanded(prevIsExpandedRef.current)
    else setIsExpanded(false)
  }, [snapshot.isDraggingOver])

  useEffect(() => {
    //collapse all groups
    if (!isAllGroupsExpended) setIsExpanded(false)
  }, [isAllGroupsExpended])

  function toggleIsExpanded() {
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
    prevIsExpandedRef.current = !isExpanded
  }

  const collapsedClass = !isExpanded ? 'collapsed' : ''

  return (
    <section className={`group-preview ${collapsedClass}`}>
      <GroupHeader
        // markedTxt={markedTxt}
        group={group}
        isHeaderExpanded={isHeaderExpanded}
        onAddGroup={onAddGroup}
        onRemoveGroup={onRemoveGroup}
        setGroupToEdit={setGroupToEdit}
        groupToEdit={groupToEdit}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        setIsAllGroupsExpended={setIsAllGroupsExpended}
        toggleIsExpanded={toggleIsExpanded}
        idx={idx}
        draggableDOMref={draggableDOMref}
      />

      {isExpanded && (
        <div className="group-content">
          <TaskList
            // markedTxt={markedTxt}
            group={group}
          />
        </div>
      )}
    </section>
  )
}
