import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { withStyles } from '@material-ui/core'
import photoShape from 'shapes/photo'
import { CloseButton } from 'components'

const styles = {
  root: {
    position: 'relative',
    borderRadius: 10,
    height: 100,
    padding: 5,
    overflow: 'hidden'
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

    close: {
      color: 'white',
    }
  },
}

class Photo extends Component {

  destroy = () => {
    const { photo, onDelete } = this.props
    onDelete(photo)
  }

  render() {
    const { classes, photo } = this.props

    return (
      <div className={classes.root}>
        <img
          alt={photo.url}
          src={photo.url}
          className={classes.picture}
        />
        <div className={classes.cover}>
          <CloseButton color="white" className={classes.close} onClick={this.destroy} />
        </div>
      </div>
    )
  }
}

Photo.propTypes = {
  classes: object.isRequired,
  photo: photoShape,
  onDelete: func.isRequired
}

export default withStyles(styles)(Photo)
