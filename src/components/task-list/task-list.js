import PropTypes from 'prop-types'

import Task from '../task'
import './taskList.css'

function TaskList({ todos, onDeleted, onToggle, onEditing, editTodo, submitEditTodo }) {
  const elementTodo = todos.map((item) => {
    const { id, editing, ...itemProps } = item
    if (editing) {
      return (
        <li key={id} className="editing">
          <input
            type="text"
            className="edit"
            onKeyUp={(e) => submitEditTodo(e, id)}
            onChange={(e) => editTodo(e, id)}
            value={itemProps.description}
          />
        </li>
      )
    }
    return (
      <li key={id} className="">
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggle={() => onToggle(id)}
          onEditing={() => onEditing(id)}
          id={id}
        />
      </li>
    )
  })
  return <ul className="todo-list">{elementTodo}</ul>
}
TaskList.defaultProps = {
  onDeleted: () => {},
  onToggle: () => {},
  onEditing: () => {},
  todos: [],
}
TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onToggle: PropTypes.func,
  onEditing: PropTypes.func,
  todos: PropTypes.shape({
    editing: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.number,
    checked: PropTypes.bool,
    date: PropTypes.number,
  }),
}
export default TaskList
