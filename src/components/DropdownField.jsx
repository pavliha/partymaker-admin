import React, { useCallback } from 'react'
import { any, arrayOf, bool, func, oneOf, shape, string } from 'prop-types'
import { FormHelperText, MenuItem, Select, FormControl, InputLabel } from '@material-ui/core'

const DropdownField = ({ items, label, name, value, variant, nonEmpty, error, helperText, onChange }) => {
  return (
    <FormControl fullWidth variant={variant}>
      <InputLabel htmlFor="outlined-age-simple">{label}</InputLabel>
      <Select
        value={value || ''}
        displayEmpty
        onChange={useCallback((e) => onChange(name, e.target.value))}
      >
        {!nonEmpty && <MenuItem value="" />}
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  )
}

DropdownField.propTypes = {
  name: string.isRequired,
  value: any,
  nonEmpty: bool,
  label: string,
  variant: oneOf(['standard', 'outlined', 'filled']),
  error: bool,
  helperText: string,
  items: arrayOf(
    shape({
      label: string.isRequired,
      value: any.isRequired,
    }),
  ),
  onChange: func.isRequired,
}

export default DropdownField
