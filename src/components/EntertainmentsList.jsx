import React from 'react'
import { arrayOf, object } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { EntertainmentsListItem } from 'components'
import entertainmentShape from 'shapes/entertainment'

const styles = {
  root: {},
}

const EntertainmentsList = ({ entertainments }) =>
  entertainments.map(({ title, places }) => (
    <EntertainmentsListItem
      title={title}
      places={places}
    />
  ))

EntertainmentsList.propTypes = {
  classes: object.isRequired,
  entertainments: arrayOf(entertainmentShape)
}

export default withStyles(styles)(EntertainmentsList)
