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
  isDragging,
  idx,
  draggableDOMref,
}) {
  const [isExpanded, setIsExpanded] = useState(true)
  const prevIsExpandedRef = useRef()

  useEffectUpdate(() => {
    if (!isDragging) setIsExpanded(prevIsExpandedRef.current)
    else setIsExpanded(false)
  }, [isDragging])

  function toggleIsExpanded() {
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
    prevIsExpandedRef.current = !isExpanded
  }

  const collapsedClass = !isExpanded ? 'collapsed' : ''

  return (
    <section className={`group-preview ${collapsedClass}`}>
      <GroupHeader
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
          <TaskList group={group} />
        </div>
      )}
    </section>
  )
}
