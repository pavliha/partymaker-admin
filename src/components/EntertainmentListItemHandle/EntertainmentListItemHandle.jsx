import React from 'react'
import { object, node } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { SortableHandle } from 'react-sortable-hoc'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    cursor: 'move'
  },
  title: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 18,
    fontFamily: 'Google Sans, Arial, sans-serif',
    [theme.breakpoints.up('md')]: {
      fontSize: 20,
    },
  },
})

const EntertainmentListItemHandle = ({ classes, children }) =>
  <Typography className={classes.root} component="div">
    {children}
  </Typography>

EntertainmentListItemHandle.propTypes = {
  classes: object.isRequired,
  children: node
}

export default withStyles(styles)(SortableHandle(EntertainmentListItemHandle))
