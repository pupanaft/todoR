import React, { useState } from 'react'

import NewTaskForm from '../new-task-form'
import Footer from '../footer'
import TaskList from '../task-list'

import './app.css'

export default function App() {
  const [todoData, setTodoData] = useState([
    {
      editing: false,
      description: 'Completed',
      id: 1,
      time: 60,
      checked: true,
      date: new Date(),
    },
    {
      editing: false,
      description: 'Editing ',
      id: 2,
      time: 20,
      checked: false,
      date: new Date(),
    },
    {
      editing: false,
      description: 'Active ',
      id: 3,
      time: 120,
      checked: false,
      date: new Date(),
    },
  ])
  const [selectedFilter, setSelectedFilter] = useState('All')

  const onItemAdded = (description, timeout) => {
    const id = todoData.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1
    const item = {
      editing: false,
      description,
      id,
      time: timeout,
      checked: false,
      date: new Date(),
    }
    setTodoData((arr) => [...arr, item])
  }

  const toggleProperty = (id, propName) =>
    todoData.map((el) => (el.id === id ? { ...el, [propName]: !el[propName] } : el))

  const editingTask = (id) => {
    const data = toggleProperty(id, 'editing')
    setTodoData(data)
  }

  const onDeletedItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id)
    const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
    setTodoData(newArr)
  }

  const onToggleDone = (id) => {
    const data = toggleProperty(id, 'checked')
    setTodoData(data)
  }

  const submitEditTodo = (newDescription, id) => {
    const newArr = todoData.map((el) =>
      el.id === id ? { ...el, description: newDescription, editing: !el.editing } : el
    )
    setTodoData(newArr)
  }

  const clearCompleted = () => {
    const newArr = todoData.filter((el) => !el.checked)
    setTodoData(newArr)
  }

  const itemLeft = todoData.filter((item) => !item.checked).length

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={onItemAdded} />
      <section className="main">
        <TaskList
          selectedFilter={selectedFilter}
          todos={todoData}
          onEditing={editingTask}
          onDeleted={onDeletedItem}
          onToggle={onToggleDone}
          submitEditTodo={submitEditTodo}
        />
        <Footer
          selectedFilter={selectedFilter}
          itemLeft={itemLeft}
          filterChange={setSelectedFilter}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  )
}
