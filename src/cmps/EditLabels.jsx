import { useState } from 'react'
import { useSelector } from 'react-redux'

import { boardService } from '../services/board.service'
import { saveBoard } from '../store/actions/board.actions'
import { ColorCan, Xbutton } from '../services/svg.service'
import { utilService } from '../services/util.service'

import { ColorPicker } from '../cmps/ColorPicker'
import { EditableText } from './EditableText'

export function EditLabels({ options, from }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)
  const [labelToEdit, setLabelToEdit] = useState(null)
  const [isColorEdit, setIsColorEdit] = useState(false)

  async function onUpdateLabelTitle(txt) {
    const updatedLabel = { ...labelToEdit, title: txt }
    setLabelToEdit(updatedLabel)
    const boardToSave = {
      ...board,
      [from]: [...board[from].map(s => (s.id === labelToEdit.id ? updatedLabel : s))],
    }
    try {
      await saveBoard(boardToSave)
    } catch (err) {
      console.log('Had issues updating label', err)
    }
  }

  async function onUpdateLabelColor(color) {
    const updatedLabel = { ...labelToEdit, color }
    const boardToSave = {
      ...board,
      [from]: [...board[from].map(s => (s.id === labelToEdit.id ? updatedLabel : s))],
    }
    try {
      await saveBoard(boardToSave)
    } catch (err) {
      console.log('Had issues updating label', err)
    }
  }

  async function onAddNewLabel() {
    const newLabel = {
      id: utilService.makeId(),
      title: '',
      color: boardService.getRandLabelColor(),
    }
    const boardToSave = { ...board, [from]: [...board[from], newLabel] }
    try {
      await saveBoard(boardToSave)
    } catch (err) {
      console.log('Had issues updating label', err)
    }
  }

  async function onRemoveLabel(itemId) {
    const boardToSave = { ...board, [from]: board[from].filter(l => l.id !== itemId) }
    try {
      await saveBoard(boardToSave)
    } catch (err) {
      console.log('Had issues updating label', err)
    }
  }

  return (
    <div className="edit-labels-container">
      {options.map(item => (
        <div
          key={item.id}
          className="label-container flex"
          onClick={() => {
            if (!labelToEdit || labelToEdit.id !== item.id) setLabelToEdit(item)
          }}
        >
          <div className="label flex">
            <button
              className="change-label-color-btn"
              style={{ backgroundColor: item.color }}
              onClick={() => setIsColorEdit(true)}
            >
              <ColorCan />
            </button>

            {isColorEdit && labelToEdit.id === item.id && (
              <ColorPicker
                options={boardService.getLabelColors()}
                submitFunc={onUpdateLabelColor}
              />
            )}

            <div
              onClick={() => {
                setIsColorEdit(false)
              }}
            >
              <EditableText
                prevTxt={item.title}
                func={onUpdateLabelTitle}
                className={'edit-labels-form'}
                name={'label-title-input'}
                placeholder={'Add Label title'}
              />
            </div>
          </div>

          <button onClick={() => onRemoveLabel(item.id)} className="remove-label-btn">
            <Xbutton size={'16px'} />
          </button>
        </div>
      ))}

      <button onClick={onAddNewLabel} className="new-label-btn">
        + New label
      </button>
    </div>
  )
}
