import React from 'react'
import { node, object, string } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = {
  root: {
    padding: 20,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  head: {
    padding: '20px 0 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Google Sans ,Roboto,Arial,sans-serif',
  },
}

const ContentCard = ({ classes, className, title, children, action }) =>
  <div className={classNames([classes.root, className])}>
    <div className={classes.head}>
      <Typography className={classes.title} variant="h4">{title}</Typography>
      <div>
        {action}
      </div>
    </div>
    {children}
  </div>

ContentCard.propTypes = {
  classes: object.isRequired,
  className: string,
  title: node.isRequired,
  children: node.isRequired,
  action: node,
}

export default withStyles(styles)(ContentCard)
