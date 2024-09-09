import { Component } from 'react'

export default class EditingTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: props.description,
    }
    this.onLabelSchange = (e) => {
      this.setState(() => ({ label: e.target.value }))
    }
  }

  render() {
    const { label } = this.state
    const { onEditing, id, submitEditTodo } = this.props
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
          onChange={(e) => this.onLabelSchange(e)}
          onBlur={() => onEditing(id)}
          value={label}
          autoFocus
        />
      </form>
    )
  }
}
