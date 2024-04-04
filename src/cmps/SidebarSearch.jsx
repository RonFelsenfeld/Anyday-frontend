import { useState } from "react";
import { AddBoardBtn, SearchIconSideBar } from "../services/svg.service";

export function SidebarSearch() {
    const [isFocused, setIsFocused] = useState(false)


    const dynClass = isFocused ? 'focused' : ''
    return <div className='side-bar-search-add flex justify-between'>
        <div className={`side-bar-search-input flex align-center ${dynClass}`}>
            <button><SearchIconSideBar /></button>
            <input onBlur={() => setIsFocused(false)} onFocus={() => setIsFocused(true)} type="text" placeholder='Search' />
        </div>
        <button className="add-board-btn btn"><AddBoardBtn /></button>
    </div>
}