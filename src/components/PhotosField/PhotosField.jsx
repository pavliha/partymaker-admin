import React, { Component, Fragment } from 'react'
import { arrayOf, bool, object, string, func, shape, oneOfType, number } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { UploadField, PhotosList } from 'components'
import uniqId from 'uniqid'
import { actions, connect } from 'src/redux'
import arrayMove from 'array-move'

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

  createTempPhoto = (value) => {
    const { value: photos, onChange } = this.props
    const photo = { id: uniqId(), url: value }
    onChange([...photos, photo])
  }

  deletePhoto = async photo => {
    const { value: photos, onChange, redux } = this.props
    redux.removePhoto(photo.id)
    onChange(photos.filter(({ url }) => url !== photo.url))
  }

  sortPhotos = ({ oldIndex, newIndex }) => {
    const { value, onChange } = this.props
    const photos = arrayMove(value, oldIndex, newIndex)
    onChange(photos.map((photo, order) => ({ ...photo, order })))
  }

  render() {
    const { classes, label, value: photos, placeholder, error, helperText, api } = this.props

    return (
      <Fragment>
        <UploadField
          label={label}
          data-testid="PhotosField-uploadField"
          type="slide"
          placeholder={placeholder}
          className={classes.field}
          name="upload"
          fullWidth
          helperText={helperText}
          error={error}
          value={this.state.value}
          onError={this.setError}
          onChange={this.createTempPhoto}
          api={api}
        />
        <PhotosList
          data-testid="PhotosField-photosList"
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
  label: string,
  value: arrayOf(shape({
    id: oneOfType([number, string]),
    url: string,
    place_id: oneOfType([number, string]),
  })),
  placeholder: string,
  error: bool,
  helperText: string,
  onChange: func.isRequired,
  redux: object.isRequired,
  api: shape({
    uploadFile: func.isRequired,
    uploadUrl: func.isRequired,
    destroy: func.isRequired,
  })
}

const redux = () => ({
  removePhoto: actions.places.photos.remove,
})

export default withStyles(styles)(connect(redux)(PhotosField))
