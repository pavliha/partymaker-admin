/* eslint-disable no-return-await */
import React, { Component } from 'react'
import { func, number, shape, arrayOf } from 'prop-types'
import placeshape from 'shapes/place'
import { withStyles } from '@material-ui/core'
import { ContentCard, FormDialog, DeleteDialog, NewButton } from 'components'
import PlaceForm from './PlaceForm'
import PlacesTable from './PlacesTable'
import { actions, select, connect } from 'src/redux'

const styles = {
  root: {},
}

class PlacesScene extends Component {

  state = {
    isDeleteDialogOpen: false,
    isPlaceDialogOpen: false,
  }

  openFormDialog = (place) =>
    this.setState({ isPlaceDialogOpen: true, place })

  closePlaceDialog = () =>
    this.setState({ isPlaceDialogOpen: false, place: null })

  openDeleteDialog = (place) =>
    this.setState({ isDeleteDialogOpen: true, place })

  closeDeleteDialog = () =>
    this.setState({ isDeleteDialogOpen: false, place: null })

  updateOrCreatePlace = async ({ id, form }) => {
    const { redux: { updatePlace, createPlace } } = this.props
    const action = await (id ? updatePlace(id, form) : createPlace(form))
    this.closePlaceDialog()

    return action
  }

  render() {
    const { redux: { places, total, loadPlaces, deletePlace } } = this.props
    const { isPlaceDialogOpen, isDeleteDialogOpen, place } = this.state

    return (
      <ContentCard
        title="Places"
        action={<NewButton title="New place" onOpen={this.openFormDialog} />}
      >
        <PlacesTable
          total={total}
          models={places}
          onLoad={loadPlaces}
          onDelete={this.openDeleteDialog}
          onEdit={this.openFormDialog}
        />
        <DeleteDialog
          id={place?.id}
          title={place?.title}
          isOpen={isDeleteDialogOpen}
          onClose={this.closeDeleteDialog}
          onConfirm={deletePlace}
        />

        <FormDialog
          title={`${place ? 'Edit place:' : 'New place'}  ${place?.title || ''}`}
          isOpen={isPlaceDialogOpen}
          onClose={this.closePlaceDialog} isEdit={!!place}
        >
          <PlaceForm
            model={place}
            onCancel={this.closePlaceDialog}
            onSubmit={this.updateOrCreatePlace}
          />
        </FormDialog>

      </ContentCard>
    )
  }
}

PlacesScene.propTypes = {
  redux: shape({
    places: arrayOf(placeshape),
    total: number,
    loadPlaces: func.isRequired,
    createPlace: func.isRequired,
    updatePlace: func.isRequired,
    deletePlace: func.isRequired,
  }).isRequired,
}

const redux = (state) => ({
  places: select.places.all(state),
  total: state.places.status.total,
  loadPlaces: actions.places.loadMany,
  createPlace: actions.places.create,
  updatePlace: actions.places.update,
  deletePlace: actions.places.destroy
})

export default withStyles(styles)(connect(redux)(PlacesScene))
