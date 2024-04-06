import { useState } from "react"

export function EditableText({ name, placeholder, func, prevTxt, className, isNew=false }) {
    const [txt, setTxt] = useState(prevTxt || '')
    
    function handleChange({ target }) {
        // console.log('target.value',target.value)
        setTxt(target.value)
    }
    
    function onSubmit(ev) {
        console.log('txt',txt)
        ev.preventDefault()
        if(!txt) return 
        func(txt)
        if (isNew) setTxt('')
    }

    return (
        <form className={className || ''} onSubmit={onSubmit}>
        <input
            type="text"
            name={name || ''}
            placeholder={placeholder || ''}
            onChange={handleChange}
            onBlur={onSubmit}
            value={txt}>
        </input>
        </form>
    )
}