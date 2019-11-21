import React, { useState } from 'react'
import { object, arrayOf, func } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { DeleteDialog, EntertainmentsListItem, PlacesList } from 'components'
import { entertainmentShape } from 'shapes'

const styles = theme => ({
  root: {},

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

const EntertainmentsList = ({ classes, entertainments, onEdit, onDestroy }) => {
  const [entertainment, setEntertainment] = useState(null)

  return (
    <div className={classes.root}>
      {entertainments.map(entertainment => (
        <EntertainmentsListItem
          entertainment={entertainment}
          onDelete={setEntertainment}
          onEdit={onEdit}
        >
          <PlacesList places={entertainment.places} />
        </EntertainmentsListItem>
      ))}

      <DeleteDialog
        model={entertainment}
        onClose={setEntertainment}
        onConfirm={onDestroy}
      />

    </div>
  )
}

EntertainmentsList.propTypes = {
  classes: object.isRequired,
  entertainments: arrayOf(entertainmentShape),
  onEdit: func.isRequired,
  onDestroy: func.isRequired,
}

export default withStyles(styles)(EntertainmentsList)
