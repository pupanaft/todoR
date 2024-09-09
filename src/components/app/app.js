import React, { Component } from 'react'

import NewTaskForm from '../new-task-form'
import Footer from '../footer'
import TaskList from '../task-list'
import './app.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoData: [
        {
          editing: false,
          description: 'Completed',
          id: 1,
          time: 60,
          checked: true,
          date: new Date(),
          //   timer:false,
        },
        {
          editing: false,
          description: 'Editing ',
          id: 2,
          time: 20,
          checked: false,
          date: new Date(),
          //   timer:false,
        },
        {
          editing: false,
          description: 'Active ',
          id: 3,
          time: 120,
          checked: false,
          date: new Date(),
          //   timer:false,
        },
      ],
      selectedFilter: 'All',
      newId: 4,
    }
    this.toggleProperty = (id, propName, todoData) =>
      todoData.map((el) => (el.id === id ? { ...el, [propName]: !el[propName] } : el))
    // this.editTodo = (e, id) => {
    //   this.setState(({ todoData }) => {
    //     const idx = todoData.findIndex((el) => el.id === id)
    //     const oldItem = todoData[idx]
    //     const newItem = { ...oldItem, description: e.target.value }
    //     const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    //     return {
    //       todoData: newArr,
    //     }
    //   })
    // }
    this.submitEditTodo = (newDescription, id) => {
      this.setState(({ todoData }) => {
        const newArr = todoData.map((el) =>
          el.id === id ? { ...el, description: newDescription, editing: !el.editing } : el
        )
        return { todoData: newArr }
      })
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

    this.onItemAdded = (description, timeout) => {
      const { newId } = this.state
      this.setState((state) => {
        const item = {
          description,
          time: timeout,
          id: newId + 1,
          checked: false,
          date: new Date(),
        }
        return { todoData: [...state.todoData, item], newId: newId + 1 }
      })
    }

    this.filterChange = (newFilter) => {
      this.setState(() => ({
        selectedFilter: newFilter,
      }))
    }

    // this.activeFilter = (todoData, filter) => {
    //   switch (filter){
    //   case 'Active' : return todoData.filter((item) => !item.checked)
    //   case 'Completed' : return todoData.filter((item) => item.checked)
    //   default: return todoData
    //   }
    // }

    this.clearCompleted = () => {
      this.setState(({ todoData }) => {
        const newArr = todoData.filter((el) => !el.checked)
        return {
          todoData: newArr,
        }
      })
    }
    // this.changeTimer = (id) => {
    //   this.setState((state) => {
    //     const todoData = this.toggleProperty(id, 'timer', state.todoData)
    //     return { todoData }
    //   })
    // }
    // this.onTimerStart = () => {

    // }
    // this.timerOneTick = () =>{
    //     if()
    // }
  }

  render() {
    const { todoData, selectedFilter } = this.state
    const itemLeft = todoData.filter((item) => !item.checked).length

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.onItemAdded} />
        <section className="main">
          <TaskList
            selectedFilter={selectedFilter}
            // changeTimer={this.changeTimer}
            todos={todoData}
            onEditing={this.editingTask}
            onDeleted={this.onDeletedItem}
            onToggle={this.onToggleDone}
            submitEditTodo={this.submitEditTodo}
            // editTodo={this.editTodo}
            // submitEditTodo={this.submitEditTodo}
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
