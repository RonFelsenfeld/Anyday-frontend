import { ColorPicker } from './ColorPicker'
import { DynamicLabelPicker } from './DynamicLabelPicker'
import { DynamicOptionsMenu } from './DynamicOptionsMenu'
import { FilePreview } from './FilePreview'
import { FilterPersonPicker } from './FilterPersonPicker'
import { PersonPicker } from './PersonPicker'
import { TimelinePicker } from './TimelinePicker'
import { TaskSortModal } from './TaskSortModal'

export function DynamicModalContent(cmp) {
  switch (cmp.type) {
    case 'labelPicker':
      return <DynamicLabelPicker {...cmp} />

    case 'optionsMenu':
      return <DynamicOptionsMenu {...cmp} />

    case 'colorPicker':
      return <ColorPicker {...cmp} />

    case 'personPicker':
      return <PersonPicker {...cmp} />

    case 'filterPersonPicker':
      return <FilterPersonPicker {...cmp} />

    case 'timelinePicker':
      return <TimelinePicker {...cmp} />

    case 'FilePreview':
      return <FilePreview {...cmp} />

    case 'sortBoard':
      return <TaskSortModal {...cmp} />
  }
}
