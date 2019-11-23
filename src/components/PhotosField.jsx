import React, { Component, Fragment } from 'react'
import { arrayOf, bool, object, string, func } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { UploadField, PhotoListItem } from 'components'
import uniqId from 'uniqid'

const styles = {
  root: {},

  photos: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

class PhotosField extends Component {

  state = {
    value: '',
    error: null,
  }

  setError = (error) =>
    this.setState({ error })

  createTempPhoto = (name, value) => {
    const { value: photos, onChange } = this.props
    const photo = { id: uniqId(), url: value }
    onChange([...photos, photo])
  }

  deletePhoto = photo => {
    const { value: photos, onChange } = this.props
    onChange(photos.filter(({ url }) => url !== photo.photo))
  }

  render() {
    const { classes, name, value: photos, placeholder, error, helperText, } = this.props

    return (
      <Fragment>
        <UploadField
          type="slide"
          placeholder={placeholder}
          className={classes.field}
          name={name}
          fullWidth
          helperText={helperText}
          error={error}
          value={this.state.value}
          onError={this.setError}
          onChange={this.createTempPhoto}
        />
        <div className={classes.photos}>
          {photos?.map(photo =>
            <PhotoListItem
              key={photo.id}
              photo={photo}
              onDelete={this.deletePhoto}
            />
          )}
        </div>
      </Fragment>
    )
  }
}

PhotosField.propTypes = {
  classes: object.isRequired,
  name: string,
  value: arrayOf(string),
  placeholder: string,
  error: bool,
  helperText: string,
  onChange: func,
}

export default withStyles(styles)(PhotosField)
