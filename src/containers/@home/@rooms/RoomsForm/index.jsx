import React from 'react'
import { object, func, bool } from 'prop-types'
import roomShape from 'shapes/room'
import { Button, DialogActions, withStyles } from '@material-ui/core'
import formik from './formik'
import { Field, Form } from 'formik'
import { TextField, ServerMessage } from 'components/formik'
import { Label, OutlineCard } from 'components'

const styles = {
  root: {},
}

const RoomsForm = ({ classes, model, isSubmitting, onCancel }) => (
  <Form className={classes.root}>
    <OutlineCard>
      <Label title="Title">
        <Field
          name="title"
          placeholder="UA Hrivna"
          margin="dense"
          component={TextField}
        />
      </Label>
      <Label title="Short title">
        <Field
          name="short_title"
          placeholder="uah"
          margin="dense"
          component={TextField}
        />
      </Label>
      <Label title="Rate to dollar">
        <Field
          name="rate_to_dollar"
          placeholder="1.6"
          type="number"
          margin="dense"
          component={TextField}
        />
      </Label>

      <ServerMessage name="message" />
      <ServerMessage color="error" name="detail" />
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

RoomsForm.propTypes = {
  classes: object.isRequired,
  model: roomShape,
  onCancel: func.isRequired,
  isSubmitting: bool.isRequired,
}

RoomsForm.formikProps = {
  onSubmit: func.isRequired,
}

export default withStyles(styles)(formik(RoomsForm))
