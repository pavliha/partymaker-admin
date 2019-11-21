import React from 'react'
import { object, func, bool, shape } from 'prop-types'
import entertainmentShape from 'shapes/entertainment'
import { Button, DialogActions, withStyles, TextField } from '@material-ui/core'
import { Form } from 'formik'
import { Field, Label, ServerMessage } from 'components'
import * as Yup from 'yup'

const styles = {
  root: {},
}

const EntertainmentForm = ({ classes, model, formik: { isSubmitting }, onCancel }) => (
  <Form className={classes.root}>
    <Label title="Title">
      <Field
        name="title"
        placeholder="Вид развлечения"
        margin="dense"
        component={TextField}
      />
    </Label>
    <ServerMessage name="message" />
    <ServerMessage color="error" name="detail" />
    <ServerMessage color="error" name="non_field_errors" />

    <DialogActions>
      <Button
        onClick={onCancel}
        disabled={isSubmitting}
        color="secondary"
      >
        Отменить
      </Button>
      <Button
        disabled={isSubmitting}
        type="submit"
        variant="outlined"
        color="primary"
      >
        {model ? 'Обновить' : 'Создать'}
      </Button>
    </DialogActions>
  </Form>
)

EntertainmentForm.propTypes = {
  classes: object.isRequired,
  model: entertainmentShape,
  onCancel: func.isRequired,
  formik: shape({
    isSubmitting: bool.isRequired,
  })
}

EntertainmentForm.validationSchema = Yup.object().shape({
  title: Yup.string().required('Пожадлуйста введите вид развлечения'),
})

EntertainmentForm.mapPropsToValues = ({ model }) => ({
  title: model?.title || '',
})

export default withStyles(styles)(EntertainmentForm)
