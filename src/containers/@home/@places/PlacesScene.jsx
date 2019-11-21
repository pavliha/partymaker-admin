/* eslint-disable no-return-await */
import React from 'react'
import { object } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import { connect, select } from 'src/redux'
import AddCircleOutlineIcon from 'mdi-react/AddCircleOutlineIcon'
import { EntertainmentsList, EntertainmentsLoader, Header } from 'components'

const styles = {
  root: {
    maxWidth: 1050,
  },
}

const PlacesScene = ({ classes, redux: { entertainments } }) =>
  <div className={classes.root}>
    <Header action={<IconButton color="secondary"><AddCircleOutlineIcon /></IconButton>} />
    <EntertainmentsLoader>
      <EntertainmentsList entertainments={entertainments} />
    </EntertainmentsLoader>
  </div>

PlacesScene.propTypes = {
  classes: object.isRequired,
  redux: object.isRequired,
}

const redux = (state) => ({
  entertainments: select.entertainments.all(state),
})

export default withStyles(styles)(connect(redux)(PlacesScene))
