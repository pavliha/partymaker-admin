import React, { Component, Fragment } from 'react'
import { arrayOf, bool, object, string, func } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { UploadField, PhotosList } from 'components'
import uniqId from 'uniqid'
import photoShape from 'shapes/photo'
import { actions, connect } from 'src/redux'
import arrayMove from 'array-move'
import api from 'api'

const styles = {
  root: {},

  photos: {
    marginTop: 10,
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
    onChange(name, [...photos, photo])
  }

  deletePhoto = async photo => {
    const { name, value: photos, onChange, redux } = this.props
    redux.removePhoto(photo.id)
    onChange(name, photos.filter(({ url }) => url !== photo.url))
  }

  sortPhotos = ({ oldIndex, newIndex }) => {
    const { name, value, onChange } = this.props
    const photos = arrayMove(value, oldIndex, newIndex)
    const orderedPhotos = photos.map((photo, order) => ({ ...photo, order }))
    onChange(name, orderedPhotos)
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
          api={{
            uploadUrl: api.uploads.picture.url.create,
            uploadFile: api.uploads.picture.file.create,
            destroy: api.uploads.destroy,
          }}
        />
        <PhotosList
          axis="x"
          photos={photos}
          className={classes.photos}
          onDelete={this.deletePhoto}
          onSortEnd={this.sortPhotos}
        />
      </Fragment>
    )
  }
}

PhotosField.propTypes = {
  classes: object.isRequired,
  name: string,
  value: arrayOf(photoShape),
  placeholder: string,
  error: bool,
  helperText: string,
  onChange: func.isRequired,
  redux: object.isRequired
}

const redux = () => ({
  removePhoto: actions.places.photos.remove,
})

export default withStyles(styles)(connect(redux)(PhotosField))
