import React, { Component } from 'react'
import { object, string, bool, func } from 'prop-types'
import { FormControl, withStyles, Checkbox, FormHelperText } from '@material-ui/core'
import classNames from 'classnames'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = {
  root: {},
}

class CheckboxField extends Component {

  change = (e) => {
    const { onChange, name } = this.props
    onChange(name, e.target.checked)
  }

  render() {
    const { classes, label, className, value, helperText, error, ...rest } = this.props

    return (
      <FormControl {...rest} className={classNames([classes.root, className])}>
        <FormControlLabel
          label={label}
          control={<Checkbox checked={value} value="checkedE" onChange={this.change} />}
        />
        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </FormControl>
    )
  }
}

CheckboxField.propTypes = {
  classes: object.isRequired,
  name: string.isRequired,
  value: bool.isRequired,
  label: string,
  className: string,
  helperText: string,
  error: bool,
  onChange: func.isRequired,
}

export default withStyles(styles)(CheckboxField)
