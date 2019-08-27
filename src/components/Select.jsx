import React, { useCallback } from 'react'
import { any, arrayOf, bool, func, oneOf, shape, string } from 'prop-types'
import { MenuItem, Select } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

const SelectField = ({ items, label, name, value, variant, nonEmpty, onChange }) => {
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
    </FormControl>
  )
}

SelectField.propTypes = {
  name: string.isRequired,
  value: any,
  nonEmpty: bool,
  label: string,
  variant: oneOf(['standard', 'outlined', 'filled']),
  items: arrayOf(
    shape({
      label: string.isRequired,
      value: any.isRequired,
    }),
  ),
  onChange: func.isRequired,
}

export default SelectField
