import React from 'react'
import { object, number, bool, oneOf, oneOfType, string } from 'prop-types'
import { TableCell as MuiTableCell, withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = {
  root: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  border: {

  },
}

const TableCell = ({ classes, align, border, width, maxWidth, minWidth, ...props }) => (
  <MuiTableCell
    className={classNames({
      [classes.root]: true,
      [classes.border]: border,
    })}
    style={{
      minWidth: width || minWidth,
      width,
      textAlign: align,
      justifyContent: align,
      maxWidth: width || maxWidth,
    }}
    {...props}
  />
)

TableCell.propTypes = {
  classes: object.isRequired,
  minWidth: oneOfType([number, string]),
  maxWidth: oneOfType([number, string]),
  width: oneOfType([number, string]),
  border: bool,
  align: oneOf(['left', 'center', 'right']),
}

export default withStyles(styles)(TableCell)
