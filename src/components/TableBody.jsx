import React from 'react'
import { func } from 'prop-types'
import { SortableContainer } from 'react-sortable-hoc'
import { TableBody as MuiTableBody } from '@material-ui/core'

const TableBody = ({ onSortEnd, ...props }) => {

  if (onSortEnd) {
    const Sortable = SortableContainer(MuiTableBody)
    return <Sortable onSortEnd={onSortEnd} useDragHandle {...props} />
  }

  return <MuiTableBody {...props} />
}

TableBody.propTypes = {
  onSortEnd: func,
}

export default TableBody
