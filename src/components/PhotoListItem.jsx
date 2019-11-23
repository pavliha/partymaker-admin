import React from 'react'
import { func, object } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import photoShape from 'shapes/photo'
import CloseCircleIcon from 'mdi-react/CloseCircleIcon'

const styles = {
  root: {
    position: 'relative',
    height: 100,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    margin: 5,
  },

  picture: {
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
}

const PhotoListItem = ({ classes, photo, onDelete }) =>
  <div className={classes.root}>
    <img alt="broken" src={photo.url} className={classes.picture} />
    <div className={classes.cover}>
      <div>
        <IconButton
          color="white"
          className={classes.closeButton}
          onClick={() => onDelete(photo)}
        >
          <CloseCircleIcon />
        </IconButton>
      </div>
    </div>
  </div>

PhotoListItem.propTypes = {
  classes: object.isRequired,
  photo: photoShape,
  onDelete: func.isRequired
}

export default withStyles(styles)(PhotoListItem)
