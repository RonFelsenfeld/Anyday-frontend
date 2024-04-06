import { useState } from "react"

export function EditableText({ name, placeholder, func, prevTxt, className, isNew=false }) {
    const [txt, setTxt] = useState(prevTxt || '')
    
    function handleChange({ target }) {
        // console.log('target.value',target.value)
        setTxt(target.value)
    }
    
    function onSaveText(ev) {
        console.log('txt',txt)
        ev.preventDefault()
        if(!txt) return 
        func(txt)
        if (isNew) setTxt('')
    }

    return (
        <form className={className || ''} onSubmit={onSaveText}>
        <input
            type="text"
            name={name}
            placeholder={placeholder || ''}
            onChange={handleChange}
            // onBlur={onSaveText}
            value={txt}>
        </input>
        </form>
    )
}