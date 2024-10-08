import classNames from 'classnames'

import EditingTask from '../editing-task'
import Task from '../task'
import './taskList.css'

function TaskList({ selectedFilter, todos, onDeleted, onToggle, onEditing, submitEditTodo }) {
  const elementTodo = todos.map((item) => {
    const className = classNames({
      Active:
        (selectedFilter === 'Active' && !item.checked) ||
        (selectedFilter === 'Completed' && item.checked) ||
        selectedFilter === 'All',
      inactive: (selectedFilter === 'Active' && item.checked) || (selectedFilter === 'Completed' && !item.checked),
    })
    const { id, editing, ...itemProps } = item
    if (editing) {
      return (
        <li key={id} className={`editing ${className}`}>
          <EditingTask
            onEditing={onEditing}
            submitEditTodo={submitEditTodo}
            description={itemProps.description}
            id={id}
          />
        </li>
      )
    }
    return (
      <li key={id} className={className}>
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
export default TaskList
