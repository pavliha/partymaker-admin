import React from 'react'
import NumberFormat from 'react-number-format'
import { any, bool, func, string } from 'prop-types'
import { TextField } from '@material-ui/core'

const NumberField = ({ label, value, error, helperText, prefix, onChange, ...rest }) =>
  <NumberFormat
    {...rest}
    label={label}
    prefix={prefix}
    value={value}
    error={error}
    helperText={helperText}
    customInput={TextField}
    onValueChange={value => onChange(value.floatValue)}
  />

NumberField.propTypes = {
  value: any,
  label: string,
  error: bool,
  helperText: string,
  prefix: string,
  suffix: string,
  onChange: func.isRequired,
}

export default NumberField
