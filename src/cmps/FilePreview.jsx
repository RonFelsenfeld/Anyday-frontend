import { showErrorMsg } from '../services/event-bus.service'
import { Trash } from '../services/svg.service'
import { saveTask } from '../store/actions/board.actions'
import { hideModal, hideToolTip, showToolTip } from '../store/actions/system.actions'

export function FilePreview({ file, task, group, board }) {
  const isImg = file.type === 'png' || file.type === 'jpg'
  const isPDF = file.type === 'pdf'

  async function onRemoveFile() {
    const fileToDeleteIdx = task.files.findIndex(currFile => currFile.url === file.url)
    if (fileToDeleteIdx < 0) {
      console.log('Remove file -> Could not find file to delete')
      return showErrorMsg('Could not delete file, try again later.')
    }

    const taskToSave = { ...task, files: task.files.filter(currFile => currFile.url !== file.url) }
    try {
      await saveTask(board, group, taskToSave)
      hideModal()
      hideToolTip()
    } catch (err) {
      console.log('Remove file -> Could not find file to delete')
      return showErrorMsg('Could not delete file, try again later.')
    }
  }

  return (
    <div className="file-preview-container">
      <button
        className="btn-remove-file flex align-center"
        onClick={onRemoveFile}
        onMouseEnter={ev => showToolTip(ev.currentTarget, 'Remove file')}
        onMouseLeave={() => hideToolTip()}
      >
        <Trash />
      </button>
      {isImg && <img className="file-img" src={file.url} />}
      {/* {isPDF && <iframe src={file.url} style={{ width: '100%', height: '100%', border: 'none' }}></iframe>} */}
      {isPDF && <embed src={file.url}></embed>}
    </div>
  )
}
