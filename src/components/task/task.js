import './task.css'
import { formatDistanceToNow } from 'date-fns'

function Task({ id, description, checked, onDeleted, onToggle, onEditing, date }) {
  const creationTime = formatDistanceToNow(date, { addSuffix: true })
  return (
    <div className="view">
      <input className="toggle" type="checkbox" id={id} checked={checked} onClick={onToggle} />
      <label htmlFor={id}>
        <span className={checked ? 'checked' : 'description'}>{description}</span>
        <span className="created">{creationTime}</span>
      </label>
      <button className="icon icon-edit" onClick={onEditing} type="button" alt="log out" />
      <button className="icon icon-destroy" onClick={onDeleted} type="button" alt="log out" />
    </div>
  )
}

export default Task
/// import styles from "./task.css"
/// {styles["view"]
/// { styles[ checked ? "checked" : "description" ] }
/// {`${styles["icon"]} ${styles["icon-edit"]}`}
