import PropTypes from 'prop-types'

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
Footer.defaultProps = {
  selectedFilter: () => {},
  filterChange: () => {},
  itemLeft: 1,
  clearCompleted: () => {},
}
Footer.propTypes = {
  selectedFilter: PropTypes.func,
  filterChange: PropTypes.func,
  clearCompleted: PropTypes.func,
  itemLeft: PropTypes.number,
}
export default Footer
