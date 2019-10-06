import React from 'react'
import { object, func, bool, shape } from 'prop-types'
import placeShape from 'shapes/place'
import { Button, DialogActions, withStyles, TextField } from '@material-ui/core'
import { Form } from 'formik'
import { Label, ServerMessage, Field, UploadField, EntertainmentsField } from 'components'
import * as Yup from 'yup'

const styles = {
  root: {},
  actions: {
    marginTop: 25,
  },
}

const PlaceForm = ({ classes, model, onCancel, formik: { isSubmitting }, }) => (
  <Form className={classes.root}>
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
        component={UploadField}
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
    <Label title="Entertainment">
      <Field
        name="entertainment_id"
        placeholder="Пейнтбол"
        margin="dense"
        component={EntertainmentsField}
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
        {model ? 'Update' : 'Create'}
      </Button>
    </DialogActions>
  </Form>
)

PlaceForm.propTypes = {
  classes: object.isRequired,
  onCancel: func.isRequired,
  model: placeShape,
  formik: shape({
    isSubmitting: bool.isRequired,
  }),
}
PlaceForm.validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  picture_url: Yup.string().required(),
  price: Yup.string().required(),
  working_hours: Yup.string().required(),
  entertainment_id: Yup.number().required()
})

PlaceForm.mapPropsToValues = ({ model }) => ({
  title: model?.title || '',
  picture_url: model?.picture_url || '',
  price: model?.price || '',
  working_hours: model?.working_hours || '',
  entertainment_id: model?.entertainment_id || ''
})

export default withStyles(styles)(PlaceForm)
