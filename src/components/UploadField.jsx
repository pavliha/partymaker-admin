import Asset from 'api/asset'
import React, { Component } from 'react'
import { object, string, func, elementType, bool } from 'prop-types'
import { withStyles } from '@material-ui/core'

const styles = {
  root: {
    position: 'relative',
  },
  fileInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
  },
}

class UploadField extends Component {

  fileInput = React.createRef()

  state = {
    loading: 0,
    url: ''
  }

  preview = (file) => {
    const reader = new FileReader()
    reader.onload = () => {
      this.setState({ avatar_url: reader.result })
    }
    try {
      reader.readAsDataURL(file)
    } catch (e) {
      console.warn(e)
    }
  }

  handleProgress = (progressEvent) => {
    const loading = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    this.setState({ loading: loading === 100 ? 0 : loading })
  }

  upload = async (e) => {
    const { name, onChange } = this.props
    const file = e.target.files[0]
    this.preview(file)

    try {
      const asset = await Asset.create(file, { onUploadProgress: this.handleProgress })
      onChange(name, asset.url)
    } catch (error) {
      console.error(error)
    }
  }

  clickFileInput = () => {
    this.fileInput.current.click()
  }

  render() {
    const { classes, value, label, helperText, error, component: Component, ...props } = this.props
    const { loading, url } = this.state

    return (
      <div className={classes.root}>
        <Component
          {...props}
          loading={loading}
          label={label}
          value={value || url}
          helperText={helperText}
          error={error}
          onClick={this.clickFileInput}
        />
        <input
          ref={this.fileInput}
          accept="image/*"
          className={classes.fileInput}
          id="upload-avatar"
          multiple
          type="file"
          onChange={this.upload}
        />
        <label htmlFor="upload-avatar" className={classes.cover}>
          <label style={{ display: 'flex' }} htmlFor="upload" />
        </label>
      </div>
    )
  }
}

UploadField.propTypes = {
  component: elementType.isRequired,
  classes: object.isRequired,
  value: string,
  name: string.isRequired,
  label: string,
  error: bool,
  helperText: string,
  onChange: func.isRequired,
}

export default withStyles(styles)(UploadField)
