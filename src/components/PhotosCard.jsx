import React from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { OutlineCard, Photo, PhotoForm, Form } from 'components'
import placeShape from 'shapes/place'
import { actions, connect } from 'src/redux'

const styles = {
  root: {
    marginTop: 15,
  },
}

const PhotosCard = ({ classes, place, redux: { createPhoto } }) =>
  <OutlineCard className={classes.root}>
    <Form component={PhotoForm} onSubmit={createPhoto} />
    {place?.photos?.map(photo => <Photo key={photo.id} src={photo.url} />)}
  </OutlineCard>

PhotosCard.propTypes = {
  classes: object.isRequired,
  place: placeShape,
  redux: shape({
    createPhoto: func.isRequired,
  })
}

const redux = (state, { place }) => ({
  createPhoto: form => actions.places.photos.create(place.id, form),
})

export default withStyles(styles)(connect(redux)(PhotosCard))
