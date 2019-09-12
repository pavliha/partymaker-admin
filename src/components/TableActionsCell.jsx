import React, { Component } from 'react'
import { object, func, oneOf } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import { TableCell } from 'components'
import EditIcon from 'mdi-react/EditIcon'
import DeleteIcon from 'mdi-react/DeleteIcon'
import VisibilityIcon from 'mdi-react/VisibilityIcon'
import VisibilityOffIcon from 'mdi-react/VisibilityOffIcon'

const styles = {
  actions: {
    display: 'flex',
  },
}

class TableActionsCell extends Component {

  state = {
    isLoading: false
  }

  edit = () => {
    const { model, onEdit } = this.props
    onEdit(model)
  }

  remove = () => {
    const { model, onDelete } = this.props
    onDelete(model)
  }

  activate = async () => {
    const { model, onActivate } = this.props
    this.setState({ isLoading: true })
    await onActivate(model)
    this.setState({ isLoading: false })
  }

  render() {
    const { classes, align, model: { is_active } } = this.props
    const { isLoading } = this.state

    return (
      <TableCell width={140} align={align} classes={classes.root}>
        <div className={classes.actions}>
          <IconButton onClick={this.edit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={this.remove}>
            <DeleteIcon />
          </IconButton>
          {typeof is_active !== 'undefined' && (
            <IconButton disabled={isLoading} onClick={this.activate}>
              {is_active ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          )}
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
  onActivate: func,
}

export default withStyles(styles)(TableActionsCell)
