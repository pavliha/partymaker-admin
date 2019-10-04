import React from 'react'
import { object, func, bool, shape } from 'prop-types'
import placeShape from 'shapes/place'
import { Button, DialogActions, withStyles, TextField } from '@material-ui/core'
import { Form } from 'formik'
import { Label, OutlineCard, ServerMessage, Field, PhotosCard, Loader } from 'components'
import * as Yup from 'yup'
import { select, connect, actions } from 'src/redux'

const styles = {
  root: {},
  actions: {
    marginTop: 25,
  }
}

const PlaceForm = ({ classes, redux: { place, loadPlace }, onCancel, formik: { isSubmitting }, }) => (
  <Loader load={loadPlace}>
    <Form className={classes.root}>
      <OutlineCard>
        <Label title="Title">
          <Field
            name="title"
            placeholder="Place name"
            margin="dense"
            component={TextField}
          />
        </Label>
        <Label title="Picture url">
          <Field
            name="picture_url"
            placeholder="http://example.com/picture.jpeg"
            margin="dense"
            component={TextField}
          />
        </Label>
        <Label title="Price">
          <Field
            name="price"
            placeholder="300 грн / чел"
            margin="dense"
            component={TextField}
          />
        </Label>
        <Label title="Working hours">
          <Field
            name="working_hours"
            placeholder="ПН-ПТ 10:00-19:30"
            margin="dense"
            component={TextField}
          />
        </Label>
        <ServerMessage name="message" />
        <ServerMessage color="error" name="non_field_errors" />

        <DialogActions className={classes.actions}>
          <Button
            onClick={onCancel}
            disabled={isSubmitting}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="outlined"
            color="primary"
          >
            {place ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </OutlineCard>

      <PhotosCard place={place} />
    </Form>
  </Loader>
)

PlaceForm.propTypes = {
  classes: object.isRequired,
  onCancel: func.isRequired,
  formik: shape({
    isSubmitting: bool.isRequired,
  }),
  redux: shape({
    place: placeShape,
    loadPlace: func,
  })
}
PlaceForm.validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  picture_url: Yup.string().required(),
  price: Yup.string().required(),
  phone: Yup.string().required(),
  map_url: Yup.string().required(),
  website_url: Yup.string().required(),
  working_hours: Yup.string().required(),
})

PlaceForm.mapPropsToValues = ({ model }) => ({
  title: model?.title || '',
  picture_url: model?.picture_url,
  price: model?.price,
  phone: model?.phone,
  map_url: model?.map_url,
  website_url: model?.website_url,
  working_hours: model?.working_hours
})

const redux = (state, { model: place }) => ({
  place: select.places.current(state, place.id),
  loadPlace: () => actions.places.load(place.id)
})

export default withStyles(styles)(connect(redux)(PlaceForm))
