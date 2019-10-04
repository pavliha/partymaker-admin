import React from 'react'
import { object, number, bool, oneOf, oneOfType, string } from 'prop-types'
import { TableCell as MuiTableCell, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { SortableHandle } from 'react-sortable-hoc'

const styles = {
  root: {
    paddingLeft: 5,
    paddingRight: 5,
    border: '1px solid rgba(0,0,0,0.1)'
  },
  border: {},
}

const TableCell = ({ classes, sortHandle, align, border, width, maxWidth, minWidth, ...props }) => {
  const Cell = () => (
    <MuiTableCell
      className={classNames({
        [classes.root]: true,
        [classes.border]: border,
      })}
      style={{
        minWidth: width || minWidth,
        width,
        paddingLeft: 5,
        cursor: sortHandle ? 'move' : 'default',
        textAlign: align,
        justifyContent: align,
        maxWidth: width || maxWidth,
      }}
      {...props}
    />
  )

  if (sortHandle) {
    const Handle = SortableHandle(Cell)
    return <Handle />
  }

  return Cell()
}

TableCell.propTypes = {
  classes: object.isRequired,
  sortHandle: bool,
  minWidth: oneOfType([number, string]),
  maxWidth: oneOfType([number, string]),
  width: oneOfType([number, string]),
  border: bool,
  align: oneOf(['left', 'center', 'right']),
}

export default withStyles(styles)(TableCell)
