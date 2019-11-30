import React, { useState } from 'react'
import { object, arrayOf, func } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { DeleteDialog, EntertainmentsListItem, PlacesList } from 'components'
import { entertainmentShape } from 'shapes'
import { SortableContainer } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { actions, connect } from 'src/redux'

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

const EntertainmentsList = ({ classes, entertainments, onEdit, onDestroy, redux }) => {
  const [entertainment, setEntertainment] = useState(null)

  const sortPlaces = (places) => ({ oldIndex, newIndex }) => {
    const movedPlaces = arrayMove(places, oldIndex, newIndex)
    const toSort = movedPlaces.map((place, order) => ({ ...place, order }))
    redux.sortPlaces(toSort)
  }

  return (
    <div className={classes.root}>
      {entertainments.map((entertainment, index) => (
        <EntertainmentsListItem
          index={index}
          key={index}
          entertainment={entertainment}
          onDelete={setEntertainment}
          onEdit={onEdit}
        >
          <PlacesList
            useDragHandle
            axis="x"
            places={entertainment.places}
            onSortEnd={sortPlaces(entertainment.places)}
          />
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
  redux: object.isRequired,
}

const redux = () => ({
  sortPlaces: actions.places.sort
})

export default withStyles(styles)(connect(redux)(SortableContainer(EntertainmentsList)))
