import React, { Component } from 'react'
import { basename } from 'path'
import { object, string, func, bool, oneOf, shape } from 'prop-types'
import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { transformValidationApi } from 'utils'
import classNames from 'classnames'
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

  findSomePicture = (clipboardItems) =>
    Array.from(clipboardItems).find(item => item.type.includes('image'))

  handleChange = (e) => {
    this.setState({ url: e.target.value })
    this.setError(null)
  }

  handlePaste = async ({ clipboardData }) => {
    const file = this.findSomePicture(clipboardData.files)
    if (file) await this.uploadFile(file)
  }

  handleFileInput = e =>
    this.uploadFile(e.target.files[0])

  setError = (error) => {
    const { onError } = this.props
    if (!error) return onError(null)
    const { file, url } = transformValidationApi(error)
    onError(file || url)
  }

  clickFileInput = () =>
    this.fileInput.current.click()

  watchProgress = (progress) =>
    this.setState({ loading: progress === 100 ? 0 : progress })

  uploadFile = async file => {
    const { type, api: { uploadFile } } = this.props
    return this.upload(() => uploadFile({ file, type, progress: this.watchProgress }))
  }

  uploadLink = async () => {
    const { api: { uploadUrl } } = this.props
    const params = {
      url: this.state.url,
      type: this.props.type
    }
    return this.upload(() => uploadUrl(params))
  }

  upload = async (callback) => {
    const { onChange } = this.props
    try {
      const { url } = await callback()
      this.setState({ url: '' })
      onChange(url)
    } catch (error) {
      this.setError(error)
    }
  }

  destroyAsset = async () => {
    const { value, onChange, api: { destroy } } = this.props
    try {
      await destroy(basename(value))
      this.setState({ url: '' })
      onChange('')
    } catch (error) {
      this.setError(error)
      onChange('')
    }
  }

  render() {
    const { classes, className, label, helperText, value, error, ...props } = this.props
    const { url, loading } = this.state

    return (
      <div className={classNames([classes.root, className])} data-testid="UploadField-root">
        <div className={classes.field}>
          <TextField
            {...props}
            disabled={!!value}
            label={label}
            value={basename(value) || url}
            helperText={helperText}
            error={error}
            onChange={this.handleChange}
            onPaste={this.handlePaste}
            InputProps={{
              endAdornment: (
                <UploadFieldAdornment
                  loading={loading}
                  trash={!!value}
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
          data-testid="UploadField-file"
          ref={this.fileInput}
          accept="image/*"
          className={classes.fileInput}
          multiple
          type="file"
          onChange={this.handleFileInput}
        />
      </div>
    )
  }
}

UploadField.propTypes = {
  classes: object.isRequired,
  type: oneOf(['thumbnail', 'slide']),
  className: string,
  value: string,
  label: string,
  error: bool,
  helperText: string,
  onChange: func.isRequired,
  onError: func.isRequired,
  api: shape({
    uploadFile: func.isRequired,
    uploadUrl: func.isRequired,
    destroy: func.isRequired,
  })
}

export default withStyles(styles)(UploadField)
