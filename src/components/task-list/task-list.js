import Task from '../task'
import './taskList.css'

function TaskList({
  todos,
  onDeleted,
  onToggle,
  onEditing,
  editTodo,
  submitEditTodo,
  // changeTimer
}) {
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
          //   changeTimer={() =>changeTimer(id)}
          //   timer={item.timer}
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
