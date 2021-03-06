import React from 'react'
import { func, number, object, oneOfType, shape, string } from 'prop-types'
import { IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import CloseCircleIcon from 'mdi-react/CloseCircleIcon'
import { SortableElement } from 'react-sortable-hoc'

const styles = {
  root: {
    position: 'relative',
    height: 100,
    margin: 5,
  },

  picture: {
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    height: '100%',
  },

  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.7)',
    cursor: 'pointer',

    closeButton: {
      color: 'white',
    }
  },

  deleteIconButton: {
    padding: 5,
    position: 'absolute',
    top: -10,
    right: -10,
  },

  deleteIcon: {
    width: 15,
    height: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 100,
  }
}

const PhotoListItem = ({ classes, photo, onDelete }) =>
  <div className={classes.root}>
    <IconButton color="secondary" className={classes.deleteIconButton} onClick={() => onDelete(photo)}>
      <CloseCircleIcon className={classes.deleteIcon} />
    </IconButton>
    <img alt="broken" src={photo.url} className={classes.picture} />
  </div>

PhotoListItem.propTypes = {
  classes: object.isRequired,
  photo: shape({
    id: oneOfType([number, string]),
    url: string,
    place_id: oneOfType([number, string]),
  }),
  onDelete: func.isRequired
}

export default withStyles(styles)(SortableElement(PhotoListItem))
