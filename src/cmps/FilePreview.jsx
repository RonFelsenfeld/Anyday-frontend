import { Trash } from '../services/svg.service'
import { hideToolTip, showToolTip } from '../store/actions/system.actions'

export function FilePreview({ file, task }) {
  const isImg = file.type === 'png' || file.type === 'jpg'
  const isPDF = file.type === 'pdf'
  console.log(task)

  function onRemoveFile() {
    console.log(file)
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
