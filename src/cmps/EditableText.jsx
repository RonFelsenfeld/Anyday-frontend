import { useEffect, useRef, useState } from 'react'
import { useSpeechRecognition } from '../customHooks/useSpeechRecognition'
import { utilService } from '../services/util.service'

export function EditableText({
  name,
  placeholder,
  func,
  prevTxt,
  className,
  isNew = false,
  isFocused = false,
  btnInfo = null,
}) {
  const [txt, setTxt] = useState(prevTxt || '')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)

  const inputRef = useRef()
  const { isListening, startListening, stopListening, hasRecognition } =
    useSpeechRecognition(setTxt)

  useEffect(() => {
    if (isFocused) inputRef.current.focus()
  }, [])

  useEffect(() => {
    if (isSubmitted) inputRef.current.blur()
  }, [isSubmitted])

  function handleChange({ target }) {
    setTxt(target.value)
  }

  function onSubmit(ev) {
    ev.preventDefault()
    if (isListening) stopListening()

    if (!txt) setTxt(prevTxt)

    if (txt) {
      func(txt)
      setIsSubmitted(true)
      setIsInputFocused(false)

      if (isNew) setTxt('')
    }
  }

  function handleBlur(ev) {
    setIsInputFocused(false)
    if (isListening) stopListening()

    if (!txt) return setTxt(prevTxt || '')
    if (isSubmitted) return setIsSubmitted(false)

    onSubmit(ev)
    setIsSubmitted(false)
    return
  }

  function handleSpeechToText() {
    startListening()
  }

  function isSpeechToTextAvailable() {
    // ! Available only on tasks, at the moment :)
    if (name === 'add-task' || className === 'edit-task') return true
    if (!hasRecognition || !isInputFocused) return false

    // // ? For some reason, not working as needed on group title
    // if (btnInfo && btnInfo.className === 'btn-change-group-color') {
    //   return false
    // }

    return false
  }

  const rndId = utilService.makeId()

  return (
    <form className={`editable-text flex align-center ${className || ''}`} onSubmit={onSubmit}>
      {btnInfo && (
        <input
          className={btnInfo.className}
          style={{ ...btnInfo?.style, marginInlineEnd: '3px' }}
          onClick={btnInfo.onClick}
        ></input>
      )}

      <div className="text-input-container flex align-center">
        {isSpeechToTextAvailable() && (
          <label
            htmlFor={`new-text-input${rndId}`}
            className={`microphone-icon ${isListening ? 'listening' : ''}`}
            onClick={handleSpeechToText}
            style={{ opacity: `${isListening ? '1' : ''}` }}
          ></label>
        )}

        <input
          ref={inputRef}
          id={`new-text-input${rndId}`}
          type="text"
          name={name || ''}
          placeholder={placeholder || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setIsInputFocused(true)}
          value={txt}
          autoComplete="off"
        ></input>
      </div>
    </form>
  )
}
