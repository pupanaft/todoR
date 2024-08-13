import './tasks-filter.css'

const staticFilter = [
  { description: 'All', id: 'All' },
  { description: 'Active', id: 'Active' },
  { description: 'Completed', id: 'Completed' },
]

function TasksFilter({ selectedFilter, filterChange }) {
  const filterItem = staticFilter.map((filter) => (
    <li key={filter.id}>
      <button
        onClick={() => filterChange(filter.description)}
        className={filter.description === selectedFilter ? ' selected' : ''}
        type="button"
      >
        {filter.description}
      </button>
    </li>
  ))
  return <ul className="filters">{filterItem}</ul>
}
export default TasksFilter
