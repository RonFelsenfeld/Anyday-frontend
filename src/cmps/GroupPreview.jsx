import { useState } from 'react'

import { GroupHeader } from './GroupHeader'
import { TaskList } from './TaskList'

export function GroupPreview({
  group,
  isHeaderExpanded,
  onRemoveGroup,
  setGroupToEdit,
  groupToEdit,
}) {
  const [isExpanded, setIsExpanded] = useState(true)

  function toggleIsExpanded() {
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
  }

  return (
    <section className="group-preview">
      <GroupHeader
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
          <TaskList group={group} />
        </div>
      )}
    </section>
  )
}
