import React, { Component } from 'react'
import './new-task-form.css'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = { label: '' }
    this.submitNewTodo = (e) => {
      e.preventDefault()
      const { onItemAdded } = this.props
      const { label } = this.state
      onItemAdded(label)
      this.setState({
        label: '',
      })
    }

    this.addTodo = (e) => {
      this.setState({
        label: e.target.value,
      })
    }
  }

  render() {
    const { label } = this.state
    return (
      <form className="header" onSubmit={this.submitNewTodo}>
        <h1>todos</h1>
        <input className="new-todo" onChange={this.addTodo} value={label} placeholder="What needs to be done?" />
      </form>
    )
  }
}
NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}
NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}
