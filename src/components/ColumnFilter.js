import React from 'react'

export const ColumnFilter = ({ column }) => { // by default this will recieve the column as props.
  const { filterValue, setFilter } = column;
  return (
    <span>
      Search:
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}

