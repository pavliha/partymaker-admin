import React from 'react'
import { object, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Field, NumberField, ServerMessage } from 'components'
import { InputAdornment } from '@material-ui/core'
import classNames from 'classnames'

const styles = {
  root: {},
}

const RequirementsFormGroup = ({ classes, className }) =>
  <div className={classNames(classes.root, className)}>
    <Field
      label="Минимальная сумма заказа"
      name="requirements.min_order_amount"
      placeholder="100 грн"
      suffix=" грн"
      component={NumberField}
      InputProps={{ startAdornment: <InputAdornment position="start">от</InputAdornment> }}
    />
    <Field
      label="Минимальный возраст участников"
      name="requirements.age_min"
      placeholder="10 лет"
      suffix=" лет"
      margin="normal"
      component={NumberField}
      InputProps={{ startAdornment: <InputAdornment position="start">от</InputAdornment> }}
    />
    <Field
      label="Максимальный возраст участников"
      name="requirements.age_max"
      placeholder="14 лет"
      suffix=" лет"
      margin="normal"
      component={NumberField}
      InputProps={{ startAdornment: <InputAdornment position="start">от</InputAdornment> }}
    />
    <Field
      label="Минимальное количество участников"
      name="requirements.players_min"
      placeholder="2 чел"
      suffix=" чел"
      margin="normal"
      InputProps={{ startAdornment: <InputAdornment position="start">от</InputAdornment> }}
      component={NumberField}
    />
    <Field
      label="Максимальное количество участников"
      name="requirements.players_max"
      margin="normal"
      suffix=" чел"
      placeholder="10 чел"
      InputProps={{ startAdornment: <InputAdornment position="start">до</InputAdornment> }}
      component={NumberField}
    />
    <ServerMessage name="message" />
    <ServerMessage color="error" name="non_field_errors" />
  </div>

RequirementsFormGroup.propTypes = {
  classes: object.isRequired,
  className: string,
}

export default withStyles(styles)(RequirementsFormGroup)
