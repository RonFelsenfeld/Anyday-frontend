import { useState } from "react"

export function EditableText({ name, placeholder, func, value }) {
    const [txt, setTxt] = useState()
    
    function handleChange({ target }) {
        setTxt(target.value)
    }
    
    function onSaveText(ev) {
        ev.preventDefault()
        func(txt)
    }

    return (
        <form onSubmit={onSaveText}>
        <input
            type="text"
            name={name}
            placeholder={placeholder || ''}
            onChange={handleChange}
            onBlur={onSaveText}
            value={value || ''}>
        </input>
        </form>
    )
}