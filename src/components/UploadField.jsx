import React, { Component } from 'react'
import { basename } from 'path'
import { object, func, string, any, bool, oneOf } from 'prop-types'
import { withStyles, FormHelperText, FormControl, Button, Input } from '@material-ui/core'

const styles = {
  root: {},

  input: {
    display: 'flex',
  },

  textInput: {
    marginRight: 10,
    flexGrow: 1,
  },

  fileInput: {
    position: 'absolute',
    opacity: 0,
    top: -100,
  },
}

class UploadField extends Component {

  fileInput = React.createRef()

  openFiles = () => {
    this.fileInput.click()
  }

  change = (e) => {
    const { onChange, name } = this.props
    onChange(name, e.target.files[0])
  }

  render() {
    const { classes, margin, name, value, accept, helperText, error, onBlur } = this.props

    return (
      <FormControl fullWidth className={classes.root}>
        <input
          accept={accept}
          name={name}
          ref={(file) => { this.fileInput = file }}
          onChange={this.change}
          onBlur={onBlur}
          className={classes.fileInput}
          type="file"
        />
        <label className={classes.label}>
          <div className={classes.input}>
            <Input
              type="text"
              margin={margin}
              className={classes.textInput}
              fullWidth
              value={basename(value?.name || value || '')}
              disabled
              onClick={this.openFiles}
            />
            <Button
              onClick={this.openFiles}
              variant="outlined"
              className={classes.button}
            >
              Open
            </Button>
          </div>
          {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
        </label>
      </FormControl>
    )
  }
}

UploadField.propTypes = {
  classes: object.isRequired,
  name: string.isRequired,
  margin: oneOf(['none', 'normal', 'dense']),
  value: any.isRequired,
  error: bool.isRequired,
  helperText: string,
  onChange: func.isRequired,
  onBlur: func.isRequired,
  accept: string,
}
UploadField.defaultProps = {
  accept: 'image/*',
}

export default withStyles(styles)(UploadField)
