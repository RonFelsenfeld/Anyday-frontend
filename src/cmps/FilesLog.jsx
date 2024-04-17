export function FilesLog({ selectedTask }) {
  function hasFiles() {
    return selectedTask.files && selectedTask.files.length
  }

  function getFileType(file) {
    if (file.type === 'png' || file.type === 'jpg') return 'img'
    if (file.type === 'pdf') return 'pdf'
    // Maybe there will be another files types
  }

  return (
    <div className="files-log-container update-log-content">
      {hasFiles() && (
        <div className="files-container flex column align-center">
          {selectedTask.files.map(file => {
            if (getFileType(file) === 'img') {
              return <img key={file.url} className="file-img" src={file.url} />
            }

            if (getFileType(file) === 'pdf') {
              return (
                <embed
                  key={file.url}
                  src={file.url}
                  style={{ height: '100%', width: '100%' }}
                ></embed>
              )
            }
          })}
        </div>
      )}

      {!hasFiles() && (
        <div className="no-files">
          <img className="upload-file-img" src="/assets/img/final-file-upload.svg" alt="" />

          <div className="files-msg">
            <h2 className="files-title">No updates yet for this item</h2>
            <p className="files-desc">
              Be the first one to update about progress, mention someone or upload files to share
              with your team members
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
