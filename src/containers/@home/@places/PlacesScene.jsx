/* eslint-disable no-return-await */
import React, { Component } from 'react'
import { func, number, shape, arrayOf, object } from 'prop-types'
import placeShape from 'shapes/place'
import { withStyles } from '@material-ui/core'
import { ContentCard, FormDialog, DeleteDialog, NewButton } from 'components'
import { actions, select, connect } from 'src/redux'
import PlacesTable from './PlacesTable'
import Place from './Place'

const styles = {

  root: {},

  table: {
    paddingTop: 5,
  }
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

  toggleActive = (model) => {
    const { redux: { updatePlace } } = this.props
    return updatePlace(model.id, { is_active: !model.is_active })
  }

  render() {
    const { classes, redux: { places, total, loadPlaces, deletePlace } } = this.props
    const { isPlaceDialogOpen, isDeleteDialogOpen, place } = this.state
    console.log(places)

    return (
      <ContentCard
        title="Places"
        action={<NewButton title="New place" onOpen={this.openFormDialog} />}
      >
        <PlacesTable
          className={classes.table}
          total={total}
          models={places}
          onLoad={loadPlaces}
          onDelete={this.openDeleteDialog}
          onEdit={this.openFormDialog}
          onActivate={this.toggleActive}
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
          onClose={this.closePlaceDialog}
          isEdit={!!place}
        >
          <Place
            place_id={place?.id}
            onClose={this.closePlaceDialog}
          />
        </FormDialog>
      </ContentCard>
    )
  }
}

PlacesScene.propTypes = {
  classes: object.isRequired,
  redux: shape({
    places: arrayOf(placeShape),
    total: number,
    loadPlaces: func.isRequired,
    updatePlace: func.isRequired,
    deletePlace: func.isRequired,
  }).isRequired,
}

const redux = (state) => ({
  places: select.places.all(state),
  total: state.places.status.total,
  loadPlaces: actions.places.loadMany,
  updatePlace: actions.places.update,
  deletePlace: actions.places.destroy
})

export default withStyles(styles)(connect(redux)(PlacesScene))
