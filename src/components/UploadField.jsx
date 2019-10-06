import api from 'api'
import React, { Component } from 'react'
import { basename } from 'path'
import { object, string, func, bool } from 'prop-types'
import { TextField, withStyles } from '@material-ui/core'
import { transformValidationApi } from 'utils'
import UploadFieldAdornment from './UploadFieldAdornment'

const styles = {
  root: {
    position: 'relative',
  },
  fileInput: {
    display: 'none',
    top: 0,
    left: 0,
    opacity: 1,
  },

  field: {
    display: 'flex',
    alignItems: 'center'
  },
}

class UploadField extends Component {

  fileInput = React.createRef()

  state = {
    loading: 0,
    url: '',
  }

  handleChange = (e) => {
    this.setState({ url: e.target.value })
    this.setError(null)
  }

  setError = (error) => {
    const { onError } = this.props
    const { file, url } = transformValidationApi(error)
    onError(file || url)
  }

  clickFileInput = () =>
    this.fileInput.current.click()

  watchProgress = (progress) =>
    this.setState({ loading: progress === 100 ? 0 : progress })

  uploadFile = async e =>
    this.upload(() => api.asset.create(e.target.files[0], this.watchProgress))

  uploadLink = async () =>
    this.upload(() => api.asset.url.create(this.state.url))

  upload = async (callback) => {
    const { name, onChange } = this.props

    try {
      const asset = await callback()
      this.setState({ url: asset.url })
      onChange(name, asset.url)
    } catch (error) {
      this.setError(error)
    }
  }

  destroyAsset = async () => {
    const { name, value, onChange } = this.props
    try {
      await api.asset.url.destroy(basename(value))
      this.setState({ url: '' })
      onChange(name, '')
    } catch (error) {
      this.setError(error)
      onChange(name, '')
    }
  }

  render() {
    const { classes, label, helperText, value, error, ...props } = this.props
    const { url, loading } = this.state

    return (
      <div className={classes.root}>
        <div className={classes.field}>
          <TextField
            {...props}
            disabled={!!value}
            label={label}
            value={basename(value) || url}
            helperText={helperText}
            error={error}
            onChange={this.handleChange}
            InputProps={{
              endAdornment: (
                <UploadFieldAdornment
                  loading={loading}
                  asset={value}
                  url={url}
                  onAdd={this.clickFileInput}
                  onUpload={this.uploadLink}
                  onDestroy={this.destroyAsset}
                />
              )
            }}
          />
        </div>
        <input
          ref={this.fileInput}
          accept="image/*"
          className={classes.fileInput}
          id="upload"
          multiple
          type="file"
          onChange={this.uploadFile}
        />
      </div>
    )
  }
}

UploadField.propTypes = {
  classes: object.isRequired,
  value: string,
  name: string.isRequired,
  label: string,
  error: bool,
  helperText: string,
  onChange: func.isRequired,
  onError: func.isRequired,
}

export default withStyles(styles)(UploadField)
