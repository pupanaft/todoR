import { useState } from 'react'

export default function EditingTask({ description, onEditing, id, submitEditTodo }) {
  const [label, setLabel] = useState(description)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submitEditTodo(label, id)
      }}
    >
      <input
        type="text"
        className="edit"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onEditing(id)
          }
        }}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={() => onEditing(id)}
        value={label}
        autoFocus
      />
    </form>
  )
}
