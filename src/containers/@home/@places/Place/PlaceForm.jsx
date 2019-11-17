import React from 'react'
import { object, func, bool, shape } from 'prop-types'
import placeShape from 'shapes/place'
import { Button, DialogActions, withStyles, TextField } from '@material-ui/core'
import { Form } from 'formik'
import { Label, ServerMessage, Field, UploadField, EntertainmentsField, EditorField } from 'components'
import * as Yup from 'yup'
import { EditorState } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'

const { createWithContent, createEmpty } = EditorState

const styles = {
  root: {},
  actions: {
    marginTop: 25,
  },
  players: {
    display: 'flex'
  }
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
        type="thumbnail"
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

    <Label title="Age">
      <Field
        name="age"
        placeholder="age"
        margin="dense"
        component={TextField}
      />
    </Label>

    <Label title="Players count" classes={{ control: classes.players }}>
      <Field
        name="players_min"
        type="number"
        placeholder="from"
        margin="dense"
        component={TextField}
      />
      <span style={{ width: 10 }} />
      <Field
        name="players_max"
        type="number"
        placeholder="to"
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

    <Label title="Description">
      <Field
        name="description"
        placeholder="Please type description here .."
        margin="dense"
        component={EditorField}
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
  picture_url: Yup.string(),
  price: Yup.string(),
  age: Yup.string().nullable(),
  players_min: Yup.number().nullable(),
  players_max: Yup.number().nullable(),
  working_hours: Yup.string(),
  entertainment_id: Yup.number().required().nullable(),
  description: Yup.object()
})

PlaceForm.mapPropsToValues = ({ model }) => ({
  title: model?.title || '',
  picture_url: model?.picture_url || '',
  price: model?.price || '',
  age: model?.age || null,
  players_min: model?.players_min || null,
  players_max: model?.players_max || null,
  working_hours: model?.working_hours || '',
  entertainment_id: model?.entertainment_id || null,
  description: model?.description ? createWithContent(stateFromHTML(model?.description)) : createEmpty()
})

export default withStyles(styles)(PlaceForm)
