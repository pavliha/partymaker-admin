import React, { Component } from 'react'
import { object, func, string, oneOf } from 'prop-types'
import { Input as MuiInput, withStyles } from '@material-ui/core'

const styles = {
  root: {
    width: '100%',
  },
}

class Input extends Component {

  change = (e) => {
    const { name, onChange } = this.props
    onChange(name, e.target.value)
  }

  render() {
    const { classes, type, ...props } = this.props

    return (
      <MuiInput
        {...props}
        fullWidth
        type={type}
        className={classes.root}
        onChange={this.change}
      />
    )
  }
}

Input.propTypes = {
  classes: object.isRequired,
  name: string.isRequired,
  type: oneOf(['number', 'text', 'date']),
  onChange: func.isRequired,
}

export default withStyles(styles)(Input)
