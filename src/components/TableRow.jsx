import React from 'react'
import { TableRow as MuiTableRow, withStyles } from '@material-ui/core'
import { SortableElement } from 'react-sortable-hoc'
import { bool } from 'prop-types'

const styles = {
  head: {
    height: 50,
  }
}

const TableRow = ({ sortable, ...props }) => {
  if (sortable) {
    const Sortable = SortableElement(MuiTableRow)
    return <Sortable {...props} />
  }

  return <MuiTableRow {...props} />
}

TableRow.propTypes = {
  sortable: bool,
}

export default withStyles(styles)(TableRow)
