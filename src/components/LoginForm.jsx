import React from 'react'
import { bool, object, shape } from 'prop-types'
import { Form } from 'formik'
import { CardContent, withStyles, TextField, Button } from '@material-ui/core'
import { Field, ServerMessage } from 'components'
import * as Yup from 'yup'

const styles = {

  root: {
    color: '#0083bc'
  },

  link: {
    marginTop: 10,
    marginLeft: 20,
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px',
    marginBottom: 20,
  },

  button: {
    minWidth: 130,
    marginRight: 40,
  }
}

const LoginForm = ({ classes, formik }) =>
  <div className={classes.root} id="login-form">
    <Form>
      <CardContent>
        <Field
          id="login-email-field"
          name="email"
          label="Email"
          autoComplete="email"
          variant="outlined"
          margin="normal"
          fullWidth
          placeholder="email@example.com"
          component={TextField}
        />
        <Field
          id="login-password-field"
          type="password"
          name="password"
          label="Пароль"
          autoComplete="current-password"
          margin="normal"
          fullWidth
          variant="outlined"
          placeholder="*******"
          component={TextField}
        />
      </CardContent>
      <ServerMessage color="error" name="non_field_error" />
      <div className={classes.actions}>
        <Button
          disabled={formik.isSubmitting}
          className={classes.button}
          type="submit"
          size="large"
          variant="outlined"
          color="primary"
        >
          {formik.isSubmitting ? 'Загрузка...' : 'Войти'}
        </Button>
      </div>
    </Form>
  </div>

LoginForm.propTypes = {
  classes: object.isRequired,
  formik: shape({
    isSubmitting: bool,
  })
}

LoginForm.mapPropsToValues = () => ({
  email: '',
  password: '',
})

LoginForm.validationSchema = Yup.object()
  .shape({
    email: Yup.string()
      .email('Неправильный email адрес!')
      .required('Это поле является обязательным'),
    password: Yup.string()
      .min(6, 'Пароль должен быть больше чем 6 символов')
      .required('Это поле является обязательным'),
  })

export default withStyles(styles)(LoginForm)
