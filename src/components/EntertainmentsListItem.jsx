import React from 'react'
import { object, func, string, arrayOf } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { PlacesList } from 'components'
import placeShape from 'shapes/place'

const styles = theme => ({
  root: {
    borderTop: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 15,
  },

  expand: {
    display: 'flex',
    paddingBottom: 5,
    paddingTop: 15,
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 10,
    }
  },

  title: {
    cursor: 'pointer',
    fontSize: 18,
    fontFamily: 'Google Sans, Arial, sans-serif',
    [theme.breakpoints.up('md')]: {
      fontSize: 20,
    },
  },

  places: {
    display: 'flex',
    overflow: 'auto',
    justifyContent: 'center',
    padding: '0 10px',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'flex-start',
      padding: 0,
    }
  }

})

const EntertainmentsListItem = ({ classes, title, places, onSelect, onDelete }) =>
  <div className={classes.root}>
    <div className={classes.expand}>
      <Typography component="div" className={classes.title}>
        {title}
      </Typography>
    </div>
    {places && (
      <PlacesList
        className={classes.places}
        places={places}
        onSelect={onSelect}
        onDelete={onDelete}
      />
    )}
  </div>

EntertainmentsListItem.propTypes = {
  classes: object.isRequired,
  title: string,
  places: arrayOf(placeShape),
  onSelect: func,
  onDelete: func,
}

export default withStyles(styles)(EntertainmentsListItem)
