import React from 'react'
import NumberFormat from 'react-number-format'
import { any, bool, func, string } from 'prop-types'
import { TextField } from '@material-ui/core'

const NumberField = ({ label, name, value, error, helperText, prefix, onChange, ...rest }) =>
  <NumberFormat
    {...rest}
    label={label}
    prefix={prefix}
    name={name}
    value={value}
    error={error}
    helperText={helperText}
    customInput={TextField}
    onValueChange={value => onChange(name, value.floatValue)}
  />

NumberField.propTypes = {
  name: string,
  value: any,
  label: string,
  error: bool,
  helperText: string,
  prefix: string,
  suffix: string,
  onChange: func.isRequired,
}

export default NumberField
