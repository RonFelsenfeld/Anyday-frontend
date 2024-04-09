import { ColorPicker } from './ColorPicker'
import { DynamicLabelPicker } from './DynamicLabelPicker'
import { DynamicOptionsMenu } from './DynamicOptionsMenu'
import { PersonPicker } from './PersonPicker'
import { TimelinePicker } from './TimelinePicker'

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

    case 'timelinePicker':
      return <TimelinePicker {...cmp} />
  }
}
