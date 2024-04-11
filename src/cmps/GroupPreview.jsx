import { useEffect, useRef, useState } from 'react'

import { GroupHeader } from './GroupHeader'
import { TaskList } from './TaskList'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

export function GroupPreview({
  group,
  isHeaderExpanded,
  onRemoveGroup,
  setGroupToEdit,
  groupToEdit,
  snapshot,
  idx,
  draggableDOMref,
  // markedTxt
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const prevIsExpandedRef = useRef(true)

  useEffectUpdate(() => {
    if (!snapshot.isDraggingOver) setIsExpanded(prevIsExpandedRef.current)
    else setIsExpanded(false)
  }, [snapshot.isDraggingOver])

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
        onRemoveGroup={onRemoveGroup}
        setGroupToEdit={setGroupToEdit}
        groupToEdit={groupToEdit}
        isExpanded={isExpanded}
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
