import React, { Component } from 'react'

import NewTaskForm from '../new-task-form'
import Footer from '../footer'
import TaskList from '../task-list'
import './app.css'

export default class App extends Component {
  static newId = 150

  constructor(props) {
    super(props)

    this.state = {
      todoData: [
        {
          editing: false,
          description: 'Completed task',
          id: 1,
          checked: true,
          date: new Date(),
        },
        {
          editing: true,
          description: 'Editing task',
          id: 2,
          checked: false,
          date: new Date(),
        },
        {
          editing: false,
          description: 'Active task',
          id: 3,
          checked: false,
          date: new Date(),
        },
      ],
      selectedFilter: 'All',
    }
    this.toggleProperty = (id, propName, todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const value = !oldItem[propName]
      const newItem = { ...oldItem, [propName]: value }
      return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    }
    this.editTodo = (e, id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const newItem = { ...oldItem, description: e.target.value }
        const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
        return {
          todoData: newArr,
        }
      })
    }
    this.submitEditTodo = (e, id) => {
      if (e.keyCode === 13) {
        this.setState((state) => {
          const todoData = this.toggleProperty(id, 'editing', state.todoData)
          return { todoData }
        })
      }
    }
    this.onDeletedItem = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
        return {
          todoData: newArr,
        }
      })
    }
    this.onToggleDone = (id) => {
      this.setState((state) => {
        const todoData = this.toggleProperty(id, 'checked', state.todoData)
        return { todoData }
      })
    }

    this.editingTask = (id) => {
      this.setState((state) => {
        const todoData = this.toggleProperty(id, 'editing', state.todoData)
        return { todoData }
      })
    }

    this.onItemAdded = (value) => {
      this.setState((state) => {
        const item = {
          taskClass: '',
          description: value,
          id: 1 + this.newId,
          checked: false,
          date: new Date(),
        }
        return { todoData: [...state.todoData, item] }
      })
    }

    this.filterChange = (newFilter) => {
      this.setState(() => ({
        selectedFilter: newFilter,
      }))
    }

    this.activeFilter = (todoData, filter) => {
      if (filter === 'All') {
        return todoData
      }
      if (filter === 'Active') {
        return todoData.filter((item) => !item.checked)
      }
      if (filter === 'Completed') {
        return todoData.filter((item) => item.checked)
      }
      return false
    }

    this.clearCompleted = () => {
      this.setState(({ todoData }) => {
        const newArr = todoData.filter((el) => !el.checked)
        return {
          todoData: newArr,
        }
      })
    }
  }

  render() {
    const { todoData, selectedFilter } = this.state
    const itemLeft = todoData.filter((item) => !item.checked).length
    const visibleItem = this.activeFilter(todoData, selectedFilter)
    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.onItemAdded} />
        <section className="main">
          <TaskList
            todos={visibleItem}
            onEditing={this.editingTask}
            onDeleted={this.onDeletedItem}
            onToggle={this.onToggleDone}
            editTodo={this.editTodo}
            submitEditTodo={this.submitEditTodo}
          />
          <Footer
            selectedFilter={selectedFilter}
            itemLeft={itemLeft}
            filterChange={this.filterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}
