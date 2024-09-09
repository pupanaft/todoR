import React, { useEffect, useState } from 'react'
import './new-task-form.css'

export default function NewTaskForm({ onItemAdded }) {
  const [formData, setFormData] = useState({ label: '', min: '', sek: '' })
  const [warningForm, setWarningForm] = useState(false)
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value > 60 ? 60 : value }))
  }
  useEffect(() => {
    if (warningForm) {
      setTimeout(setWarningForm, 3000, false)
    }
  }, [warningForm])

  const handleSubmit = (e) => {
    e.preventDefault()
    const { label, min, sek } = formData
    if (label && min && sek) {
      const timeout = parseInt(min, 10) * 60 + parseInt(sek, 10)

      onItemAdded(label, timeout)
      setFormData({ label: '', min: '', sek: '' })
    } else {
      setWarningForm(true)
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
          type="number"
          name="min"
          id="min"
          placeholder="min"
        />
        <input
          className="new-todo-form__timer"
          onChange={handleChange}
          onKeyDown={enterDown}
          value={formData.sek}
          type="number"
          name="sek"
          id="sek"
          placeholder="sec"
        />
      </form>
      {warningForm ? <div className="new-todo__warning">Заполните все поля формы</div> : null}
    </header>
  )
}
