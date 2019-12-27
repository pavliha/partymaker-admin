import React, { useState } from 'react'
import { array, object, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { DeleteDialog, PlaceListItem } from 'components'
import classNames from 'classnames'
import { SortableContainer } from 'react-sortable-hoc'
import { actions, connect } from 'src/redux'

const styles = () => ({
  root: {},
})

const PlacesList = ({ classes, className, places, redux }) => {
  const [place, setPlace] = useState(null)

  return (
    <div className={classNames([classes.root, className])}>
      {places.map((place, index) =>
        <PlaceListItem
          key={place.id}
          index={index}
          place={place}
          onDelete={setPlace}
        />
      )}
      <DeleteDialog
        model={place}
        onClose={setPlace}
        onConfirm={redux.destroyPlace}
      />
    </div>
  )
}

PlacesList.propTypes = {
  classes: object.isRequired,
  className: string,
  places: array.isRequired,
  redux: object.isRequired,
}

const redux = () => ({
  destroyPlace: place => actions.places.destroy(place.id),
})

export default withStyles(styles)(connect(redux)(SortableContainer(PlacesList)))
