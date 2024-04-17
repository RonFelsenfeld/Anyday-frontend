import { useEffect, useRef, useState } from 'react'

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
  const inputRef = useRef()

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

    if (!txt) setTxt(prevTxt)
    
    if (txt) {
      func(txt)
      setIsSubmitted(true)

      if (isNew) setTxt('')
    }
  }

  function handleBlur(ev) {
    if (isSubmitted) return setIsSubmitted(false)

    onSubmit(ev)
    setIsSubmitted(false)
    return
  }

  return (
    <form className={className || ''} onSubmit={onSubmit}>
      {btnInfo && (
        <input
          className={btnInfo.className}
          style={{ ...btnInfo.style, marginInlineEnd: '3px' }}
          onClick={btnInfo.onClick}
        ></input>
      )}

      <input
        ref={inputRef}
        type="text"
        name={name || ''}
        placeholder={placeholder || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        value={txt}
        autoComplete="off"
      ></input>
    </form>
  )
}
