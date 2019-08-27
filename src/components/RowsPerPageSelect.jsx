import React from 'react'
import { object, func, arrayOf, number } from 'prop-types'
import { withStyles, MenuItem, Select } from '@material-ui/core'

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    paddingRight: 20,
    marginLeft: 10,

  }
})

const RowsPerPageSelect = ({ classes, rowsPerPage, value, onChange }) =>
  <div className={classes.root}>
    <Select
      disableUnderline
      value={value}
      inputProps={{
        className: classes.input,
      }}
      onChange={onChange}
    >
      {rowsPerPage.map(rows => <MenuItem key={rows} value={rows}>{rows}</MenuItem>)}
    </Select>
  </div>

RowsPerPageSelect.propTypes = {
  classes: object.isRequired,
  rowsPerPage: arrayOf(number).isRequired,
  value: number.isRequired,
  onChange: func.isRequired,
}

export default withStyles(styles)(RowsPerPageSelect)
