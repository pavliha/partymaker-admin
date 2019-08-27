import React, { Component } from 'react'
import { object, func, oneOf } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import { TableCell } from 'components'
import EditIcon from 'mdi-react/EditIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'

const styles = {
  actions: {
    display: 'flex',
  },
}

class TableActionsCell extends Component {

  edit = () => {
    const { model, onEdit } = this.props
    onEdit(model)
  }

  remove = () => {
    const { model, onDelete } = this.props
    onDelete(model)
  }

  render() {
    const { classes, align } = this.props

    return (
      <TableCell width={110} align={align} classes={classes.root}>
        <div className={classes.actions}>
          <IconButton onClick={this.edit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={this.remove}>
            <DeleteIcon />
          </IconButton>
        </div>
      </TableCell>
    )
  }
}

TableActionsCell.propTypes = {
  align: oneOf(['left', 'center', 'right']),
  classes: object.isRequired,
  model: object.isRequired,
  onDelete: func.isRequired,
  onEdit: func.isRequired,
}

export default withStyles(styles)(TableActionsCell)
