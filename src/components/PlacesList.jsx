import React, { useState } from 'react'
import { arrayOf, func, object, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import placeShape from 'shapes/place'
import { DeleteDialog, PlaceListItem } from 'components'
import classNames from 'classnames'
import { actions, connect } from 'src/redux'

const styles = () => ({
  root: {},
})

const PlacesList = ({ classes, className, places, onSelect, redux }) => {
  const [place, setPlace] = useState(null)

  return (
    <div className={classNames([classes.root, className])}>
      {places.map(place =>
        <PlaceListItem
          key={place.id}
          place={place}
          onSelect={onSelect}
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
  places: arrayOf(placeShape).isRequired,
  onSelect: func,
  redux: object.isRequired,
}

const redux = () => ({
  destroyPlace: place => actions.places.destroy(place.id),
})

export default withStyles(styles)(connect(redux)(PlacesList))
