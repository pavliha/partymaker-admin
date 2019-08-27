import React, { Component } from 'react'
import { any, arrayOf, bool, func, shape, string } from 'prop-types'
import { MenuItem, Select, withStyles } from '@material-ui/core'

const styles = {
  root: {},
}

class SelectInput extends Component {

  change = (e) => {
    const { name, onChange } = this.props
    onChange(name, e.target.value)
  }

  render() {
    const { items, name, label, value, nonEmpty, ...props } = this.props

    return (
      <Select
        fullWidth
        {...props}
        value={value || ''}
        displayEmpty
        onChange={this.change}
        inputProps={{ name, label }}
      >
        {!nonEmpty && <MenuItem value="" />}
        {items.map((item, index) =>
          <MenuItem
            key={index}
            value={item.value}
          >
            {item.label}
          </MenuItem>,
        )}
      </Select>
    )
  }
}

SelectInput.propTypes = {
  name: string.isRequired,
  label: string,
  value: any,
  nonEmpty: bool,
  items: arrayOf(shape({
    label: string.isRequired,
    value: any.isRequired,
  })),
  onChange: func.isRequired,
}

export default withStyles(styles)(SelectInput)
