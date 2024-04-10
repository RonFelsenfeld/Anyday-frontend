import { useState } from 'react'

import { GroupHeader } from './GroupHeader'
import { TaskList } from './TaskList'

export function GroupPreview({
  group,
  isHeaderExpanded,
  onRemoveGroup,
  setGroupToEdit,
  groupToEdit,
  // markedTxt
}) {
  const [isExpanded, setIsExpanded] = useState(true)

  function toggleIsExpanded() {
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
  }

  return (
    <section className="group-preview">
      <GroupHeader
        // markedTxt={markedTxt}
        group={group}
        isHeaderExpanded={isHeaderExpanded}
        onRemoveGroup={onRemoveGroup}
        setGroupToEdit={setGroupToEdit}
        groupToEdit={groupToEdit}
        isExpanded={isExpanded}
        toggleIsExpanded={toggleIsExpanded}
      />

      {isExpanded && (
        <div className="group-content">
          <TaskList
            // markedTxt={markedTxt}
            group={group} />
        </div>
      )}
    </section>
  )
}
