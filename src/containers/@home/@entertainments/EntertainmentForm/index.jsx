import React from 'react'
import { object, func, bool } from 'prop-types'
import entertainmentShape from 'shapes/entertainment'
import { Button, DialogActions, withStyles } from '@material-ui/core'
import formik from './formik'
import { Field, Form } from 'formik'
import { TextField, ServerMessage } from 'components/formik'
import { Label, OutlineCard } from 'components'

const styles = {
  root: {},
}

const EntertainmentsForm = ({ classes, model, isSubmitting, onCancel }) => (
  <Form className={classes.root}>
    <OutlineCard>
      <Label title="Title">
        <Field
          name="title"
          placeholder="Entertainment name"
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

EntertainmentsForm.propTypes = {
  classes: object.isRequired,
  model: entertainmentShape,
  onCancel: func.isRequired,
  isSubmitting: bool.isRequired,
}

EntertainmentsForm.formikProps = {
  onSubmit: func.isRequired,
}

export default withStyles(styles)(formik(EntertainmentsForm))
