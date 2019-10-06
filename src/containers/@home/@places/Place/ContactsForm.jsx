import React from 'react'
import { object, func, bool, shape } from 'prop-types'
import { Button, DialogActions, withStyles, TextField } from '@material-ui/core'
import { Form } from 'formik'
import { Label, ServerMessage, Field } from 'components'
import * as Yup from 'yup'

const styles = {
  root: {},
  actions: {
    marginTop: 25,
  },
}

const ContactsForm = ({ classes, onCancel, formik: { isSubmitting }, }) => (
  <Form className={classes.root}>
    <Label title="Phone number">
      <Field
        name="phone"
        placeholder="Phone number"
        margin="dense"
        component={TextField}
      />
    </Label>
    <Label title="Website url">
      <Field
        name="website_url"
        placeholder="http://example.com"
        margin="dense"
        component={TextField}
      />
    </Label>
    <Label title="Map url">
      <Field
        name="map_url"
        placeholder="map url"
        margin="dense"
        component={TextField}
      />
    </Label>
    <Label title="Address">
      <Field
        name="address"
        placeholder="Address"
        margin="dense"
        component={TextField}
      />
    </Label>
    <Label title="Email">
      <Field
        type="email"
        name="email"
        placeholder="Email"
        margin="dense"
        component={TextField}
      />
    </Label>
    <Label title="Instagram url">
      <Field
        type="url"
        name="instagram_url"
        placeholder="Instagram url"
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
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </DialogActions>
  </Form>
)

ContactsForm.propTypes = {
  classes: object.isRequired,
  onCancel: func.isRequired,
  formik: shape({
    isSubmitting: bool.isRequired,
  }),
}
ContactsForm.validationSchema = Yup.object().shape({
  phone: Yup.string().required(),
  website_url: Yup.string(),
  map_url: Yup.string(),
  address: Yup.string(),
  email: Yup.string().email(),
  instagram_url: Yup.string(),
})

ContactsForm.mapPropsToValues = ({ model }) => ({
  phone: model?.phone || '',
  website_url: model?.website_url || '',
  map_url: model?.map_url || '',
  address: model?.address || '',
  email: model?.email || '',
  instagram_url: model?.instagram_url || ''
})

export default withStyles(styles)(ContactsForm)
