import React from 'react'
import { object, func, bool } from 'prop-types'
import placeshape from 'shapes/place'
import { Button, DialogActions, withStyles } from '@material-ui/core'
import formik from './formik'
import { Field, Form } from 'formik'
import { TextField, ServerMessage } from 'components/formik'
import { Label, OutlineCard } from 'components'

const styles = {
  root: {},
}

const PlaceForm = ({ classes, model, isSubmitting, onCancel }) => (
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
          placeholder="https://www.google.com/maps/place/Klub+%22Blok-Post%22+Peyntbol,Lazertag,TIR,Arenda+besedok./@47.7976408,35.167646,15z/data=!4m2!3m1!1s0x0:0xd3cabe72da827682?sa=X&ved=2ahUKEwjKjq-YyPrjAhWtwqYKHePkAQQQ_BIwCnoECAoQCA"
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
  model: placeshape,
  onCancel: func.isRequired,
  isSubmitting: bool.isRequired,
}

PlaceForm.formikProps = {
  onSubmit: func.isRequired,
}

export default withStyles(styles)(formik(PlaceForm))
