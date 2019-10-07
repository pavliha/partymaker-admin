import React, { Component } from 'react'
import { object, func, shape, number } from 'prop-types'
import placeShape from 'shapes/place'
import { Typography, withStyles } from '@material-ui/core'
import { OutlineCard, Loader, Form } from 'components'
import { select, connect, actions } from 'src/redux'
import { stateToHTML } from 'draft-js-export-html'
import ContactsForm from './ContactsForm'
import PlaceForm from './PlaceForm'
import PhotoForm from './PhotoForm'
import Photo from './Photo'

const styles = {
  card: {
    marginBottom: 15,
  },

  actions: {
    marginTop: 25,
  },

  photos: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

class Place extends Component {

  submitPlace = async (values) => {
    const { redux: { place, updatePlace, createPlace } } = this.props
    const form = { ...values, description: stateToHTML(values.description.getCurrentContent()) }
    return place ? updatePlace(place.id, form) : createPlace(form)
  }

  submitContacts = (form) => {
    const { redux: { place, updateContacts, createContacts } } = this.props
    const contacts = place?.contacts
    return contacts ? updateContacts(contacts.id, form) : createContacts(form)
  }

  render() {
    const { classes, place_id, redux: { place, loadPlace, createPhoto, destroyPhoto }, onClose } = this.props
    console.log(place)

    return (
      <Loader load={loadPlace} cancel={!place_id}>
        <OutlineCard className={classes.card}>
          <Form
            model={place}
            component={PlaceForm}
            onCancel={onClose}
            onSubmit={this.submitPlace}
          />
        </OutlineCard>
        {place && (
          <OutlineCard className={classes.card}>
            <Form
              component={PhotoForm}
              onSubmit={createPhoto}
            />
            <div className={classes.photos}>
              {place?.photos?.map(photo =>
                <Photo
                  key={photo.id}
                  photo={photo}
                  onDelete={destroyPhoto}
                />
              )}
            </div>
          </OutlineCard>
        )}
        {place && (
          <OutlineCard className={classes.card}>
            <Typography gutterBottom variant="h6" className={classes.title}>
              Contacts
            </Typography>
            <Form
              model={place?.contacts}
              component={ContactsForm}
              onCancel={onClose}
              onSubmit={this.submitContacts}
            />
          </OutlineCard>
        )}
      </Loader>
    )
  }
}

Place.propTypes = {
  classes: object.isRequired,
  place_id: number,
  onClose: func.isRequired,
  redux: shape({
    place: placeShape,
    loadPlace: func,
    createPhoto: func,
    destroyPhoto: func,
    createContacts: func,
    updateContacts: func,
  })
}

const redux = (state, { place_id }) => ({
  place: select.places.current(state, place_id),
  loadPlace: () => actions.places.load(place_id),
  createPlace: actions.places.create,
  updatePlace: actions.places.update,
  createPhoto: form => actions.places.photos.create(place_id, form),
  destroyPhoto: photo => actions.places.photos.destroy(place_id, photo.id),
  createContacts: form => actions.places.contacts.create(place_id, form),
  updateContacts: (contact_id, form) => actions.places.contacts.update(place_id, contact_id, form),
})

export default withStyles(styles)(connect(redux)(Place))
