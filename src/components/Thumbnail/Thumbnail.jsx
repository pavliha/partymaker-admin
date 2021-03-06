import React from 'react'
import { object, string, func } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import classNames from 'classnames'

const styles = {
  root: {
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.12)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}

const Thumbnail = ({ classes, className, src, onClick }) =>
  <div
    className={classNames(classes.root, className)}
    style={{ backgroundImage: src && `url(${src})` }}
    onClick={onClick}
  />

Thumbnail.propTypes = {
  classes: object.isRequired,
  className: string,
  src: string,
  onClick: func,
}

Thumbnail.defaultProps = {
  onClick: () => {}
}

export default withStyles(styles)(Thumbnail)
