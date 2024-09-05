import TasksFilter from '../tasks-filter'
import './footer.css'

function Footer({ itemLeft, selectedFilter, filterChange, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemLeft} items left</span>
      <TasksFilter selectedFilter={selectedFilter} filterChange={filterChange} />
      <button className="clear-completed" type="button" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  )
}
export default Footer
