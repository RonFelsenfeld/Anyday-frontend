import { useEffect, useState } from 'react'
import { utilService } from '../services/util.service'

export function useHighlightText(filterString, txt, className = 'highlighted') {
  const [highlightedText, setHighlightedText] = useState([])

  useEffect(() => {
    if (!filterString || !txt) {
      return setHighlightedText([])
    }

    const formattedFilter = utilService.getFormattedRegex(filterString)
    const filterRegex = new RegExp(`${formattedFilter}`, 'gi')

    let markedTxt = []
    let startIdx = 0

    let match
    while ((match = filterRegex.exec(txt)) !== null) {
      const txtBeforeMatch = txt.slice(startIdx, match.index)
      if (txtBeforeMatch) markedTxt.push(txtBeforeMatch)

      markedTxt.push(
        <span key={match.index} className={className} style={{ backgroundColor: 'red' }}>
          {match[0]}
        </span>
      )
      startIdx = match.index + match[0].length
    }

    const txtAfterMatch = txt.slice(startIdx)

    if (txtAfterMatch) markedTxt.push(txtAfterMatch)

    setHighlightedText(<>{markedTxt}</>)
  }, [filterString, txt])

  return highlightedText
}
