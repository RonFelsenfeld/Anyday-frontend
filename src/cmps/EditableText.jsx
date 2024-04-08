import { useState } from 'react'

export function EditableText({ name, placeholder, func, prevTxt, className, isNew = false }) {
  const [txt, setTxt] = useState(prevTxt || '')

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

  return (
    <form className={className || ''} onSubmit={onSubmit}>
      <input
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
