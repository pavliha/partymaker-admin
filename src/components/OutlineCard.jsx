import React from 'react'
import { object, string, node } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = {
  root: {
    display: 'block',
    position: 'relative',
    padding: '24px',
    borderRadius: 8,
    border: '1px solid #dadce0',
    overflow: 'auto'
  },
  title: {
    position: 'absolute',
    left: 15,
    top: 0,
    padding: '0px 15px 15px',
  },
}

const OutlineCard = ({ classes, className, title, children }) =>
  <div className={classNames([classes.root, className])}>
    {Boolean(title) && (
      <Typography
        className={classes.title}
        color="textSecondary"
        variant="caption"
      >
        {title}
      </Typography>
    )}
    {children}
  </div>

OutlineCard.propTypes = {
  classes: object.isRequired,
  className: string,
  title: string,
  children: node.isRequired,
}

export default withStyles(styles)(OutlineCard)
