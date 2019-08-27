/* eslint-disable no-return-await */
import React, { Component } from 'react'
import { func, number, shape, arrayOf } from 'prop-types'
import roomShape from 'shapes/room'
import { withStyles } from '@material-ui/core'
import { ContentCard, FormDialog, DeleteDialog, NewButton, OutlineCard } from 'components'
import RoomsForm from './RoomsForm'
import RoomsTable from './RoomsTable'
import { actions, select, connect } from 'src/redux'

const styles = {
  root: {},
}

class RoomsScene extends Component {

  state = {
    isDeleteDialogOpen: false,
    isRoomDialogOpen: false,
  }

  openFormDialog = (room) =>
    this.setState({ isRoomDialogOpen: true, room })

  closeRoomDialog = () =>
    this.setState({ isRoomDialogOpen: false, room: null })

  openDeleteDialog = (room) =>
    this.setState({ isDeleteDialogOpen: true, room })

  closeDeleteDialog = () =>
    this.setState({ isDeleteDialogOpen: false, room: null })

  updateOrCreateRoom = async ({ id, form }) => {
    const { redux: { updateRoom, createRoom } } = this.props
    const action = await (id ? updateRoom(id, form) : createRoom(form))
    this.closeRoomDialog()

    return action
  }

  render() {
    const { redux: { rooms, total, loadRooms, deleteRoom } } = this.props
    const { isRoomDialogOpen, isDeleteDialogOpen, room } = this.state

    return (
      <ContentCard
        title="Rooms"
        action={<NewButton title="New room" onOpen={this.openFormDialog} />}
      >
        <OutlineCard>
          <RoomsTable
            total={total}
            models={rooms}
            onLoad={loadRooms}
            onDelete={this.openDeleteDialog}
            onEdit={this.openFormDialog}
          />
        </OutlineCard>

        <DeleteDialog
          id={room?.id}
          title={room?.title}
          isOpen={isDeleteDialogOpen}
          onClose={this.closeDeleteDialog}
          onConfirm={deleteRoom}
        />

        <FormDialog
          title={`${room ? 'Edit room:' : 'New room'}  ${room?.title || ''}`}
          isOpen={isRoomDialogOpen}
          onClose={this.closeRoomDialog} isEdit={!!room}
        >
          <RoomsForm
            model={room}
            onCancel={this.closeRoomDialog}
            onSubmit={this.updateOrCreateRoom}
          />
        </FormDialog>

      </ContentCard>
    )
  }
}

RoomsScene.propTypes = {
  redux: shape({
    rooms: arrayOf(roomShape),
    total: number,
    loadRooms: func.isRequired,
    createRoom: func.isRequired,
    updateRoom: func.isRequired,
    deleteRoom: func.isRequired,
  }).isRequired,
}

const redux = (state) => ({
  rooms: select.rooms.all(state),
  total: state.rooms.status.total,
  loadRooms: actions.rooms.loadMany,
  createRoom: actions.rooms.create,
  updateRoom: actions.rooms.update,
  deleteRoom: actions.rooms.destroy
})

export default withStyles(styles)(connect(redux)(RoomsScene))
