export function FilePreview({ file }) {
    console.log('format', file)

    const isImg = file.type === 'png' || file.type === 'jpg'
    const isPDF = file.type === 'pdf'

    return <div className="file-preview-container">
        {isImg && < img className='file-img' src={file.url} />}
        {/* {isPDF && <iframe src={file.url} style={{ width: '100%', height: '100%', border: 'none' }}></iframe>} */}
        {isPDF && <embed src={file.url} ></embed>}
    </div>
}

