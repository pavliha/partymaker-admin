import React from 'react'
import { arrayOf, func, number, object, oneOfType, shape, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { SortableContainer } from 'react-sortable-hoc'
import classNames from 'classnames'
import { PhotoListItem } from 'components'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
}

const PhotosList = ({ classes, className, photos, onDelete }) =>
  <div className={classNames(classes.root, className)}>
    {photos?.map((photo, index) =>
      <PhotoListItem
        index={index}
        key={photo.id}
        photo={photo}
        onDelete={onDelete}
      />
    )}
  </div>

PhotosList.propTypes = {
  classes: object.isRequired,
  className: string,
  photos: arrayOf(shape({
    id: oneOfType([number, string]),
    url: string,
    place_id: oneOfType([number, string]),
  })),
  onDelete: func,
}

export default withStyles(styles)(SortableContainer(PhotosList))
