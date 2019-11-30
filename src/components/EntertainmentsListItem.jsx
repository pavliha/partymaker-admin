import React from 'react'
import { object, func, node } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { IconButton } from '@material-ui/core'
import CloseIcon from 'mdi-react/CloseIcon'
import AddCircleOutlineIcon from 'mdi-react/AddCircleOutlineIcon'
import EditIcon from 'mdi-react/EditIcon'
import { entertainmentShape } from 'shapes'
import { Link } from 'react-router-dom'
import { SortableElement } from 'react-sortable-hoc'
import { EntertainmentListItemHandle } from 'components'

const styles = theme => ({
  root: {
    paddingTop: 15,
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    paddingBottom: 9,
  },

  expand: {
    display: 'flex',
    paddingBottom: 5,
    paddingLeft: 15,
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 10,
    }
  },

  icon: {
    width: 18,
    height: 18,
  },

  iconButton: {
    padding: 5,
  },
})

const EntertainmentsListItem = ({ classes, entertainment, children, onEdit, onDelete }) =>
  <div className={classes.root}>
    <div className={classes.expand}>
      <IconButton
        className={classes.iconButton}
        color="secondary"
        onClick={() => onDelete(entertainment)}
      >
        <CloseIcon className={classes.icon} />
      </IconButton>
      <IconButton
        className={classes.iconButton}
        color="secondary"
        onClick={() => onEdit(entertainment)}
      >
        <EditIcon className={classes.icon} />
      </IconButton>
      <EntertainmentListItemHandle>{entertainment.title}</EntertainmentListItemHandle>
      <Link to="/home/places/create">
        <IconButton className={classes.iconButton} color="secondary">
          <AddCircleOutlineIcon className={classes.icon} />
        </IconButton>
      </Link>
    </div>
    {children}
  </div>

EntertainmentsListItem.propTypes = {
  classes: object.isRequired,
  entertainment: entertainmentShape,
  children: node,
  onDelete: func,
  onEdit: func,
}

export default withStyles(styles)(SortableElement(EntertainmentsListItem))
