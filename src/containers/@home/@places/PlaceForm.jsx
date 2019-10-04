import React from 'react'
import { object, func, bool, shape } from 'prop-types'
import placeShape from 'shapes/place'
import { Button, DialogActions, withStyles, TextField } from '@material-ui/core'
import { Form } from 'formik'
import { Label, OutlineCard, ServerMessage, Field } from 'components'
import * as Yup from 'yup'

const styles = {
  root: {},
}

const PlaceForm = ({ classes, model, formik: { isSubmitting }, onCancel }) => (
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
      <Label title="Phone">
        <Field
          name="phone"
          placeholder="+380683188524"
          margin="dense"
          component={TextField}
        />
      </Label>
      <Label title="Map url">
        <Field
          name="map_url"
          placeholder="https://www.google.com/maps/plok./@4ta=!AQQQ_BIwCnoECAoQCA"
          margin="dense"
          component={TextField}
        />
      </Label>
      <Label title="Website url">
        <Field
          name="website_url"
          placeholder="http://www.laser-tag.zp.ua/"
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
    </OutlineCard>

    <DialogActions>
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
  model: placeShape,
  onCancel: func.isRequired,
  formik: shape({
    isSubmitting: bool.isRequired,
  })
}

PlaceForm.formikProps = {
  onSubmit: func.isRequired,
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

export default withStyles(styles)(PlaceForm)
