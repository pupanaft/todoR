import React, { useState } from 'react'
import './new-task-form.css'

export default function NewTaskForm({ onItemAdded }) {
  const [formData, setFormData] = useState({ label: '', min: '', sek: '' })
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value > 60 ? 60 : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { label, min, sek } = formData
    if (label && min && sek) {
      onItemAdded(label, parseInt(min, 10), parseInt(sek, 10))
      setFormData({ label: '', min: '', sek: '' })
    } else {
      console.log('Please fill all fields')
    }
  }
  const enterDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event)
    }
  }
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          className="new-todo"
          onChange={handleChange}
          onKeyDown={enterDown}
          value={formData.label}
          type="text"
          id="label"
          name="label"
          placeholder="What needs to be done?"
        />
        <input
          className="new-todo-form__timer"
          onChange={handleChange}
          onKeyDown={enterDown}
          value={formData.min}
          type="text"
          name="min"
          id="min"
          placeholder="min"
        />
        <input
          className="new-todo-form__timer"
          onChange={handleChange}
          onKeyDown={enterDown}
          value={formData.sek}
          type="text"
          name="sek"
          id="sek"
          placeholder="sec"
        />
      </form>
    </header>
  )
}
