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
  const inputRef = useRef()

  useEffect(() => {
    if (isFocused) inputRef.current.focus()
  }, [])

  function handleChange({ target }) {
    setTxt(target.value)
  }

  function onSubmit(ev) {
    ev.preventDefault()

    if (txt) {
      func(txt)
      if (isNew) setTxt('')
    }
  }

  // function handleBlur(ev) {
  //   if (btnInfo && ev.target.type === 'text') return
  //   onSubmit(ev)
  // }

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
        onBlur={onSubmit}
        value={txt}
        autoComplete='off'
      ></input>
    </form>
  )
}
