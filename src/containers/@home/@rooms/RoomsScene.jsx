/* eslint-disable no-return-await */
import React, { Component } from 'react'
import { func, number, shape, arrayOf } from 'prop-types'
import roomShape from 'shapes/room'
import { withStyles } from '@material-ui/core'
import { ContentCard, DeleteDialog, NewButton } from 'components'
import RoomsTable from './RoomsTable'
import { actions, select, connect } from 'src/redux'

const styles = {
  root: {},
}

class RoomsScene extends Component {

  state = {
    isRoomDialogOpen: false,
  }

  openFormDialog = (room) =>
    this.setState({ isRoomDialogOpen: true, room })

  openDeleteDialog = (room) =>
    this.setState({ isDeleteDialogOpen: true, room })

  closeDeleteDialog = () =>
    this.setState({ isDeleteDialogOpen: false, room: null })

  render() {
    const { redux: { rooms, total, loadRooms, deleteRoom } } = this.props
    const { isDeleteDialogOpen, room } = this.state

    return (
      <ContentCard
        title="Rooms"
        action={<NewButton title="New room" onOpen={this.openFormDialog} />}
      >
        <RoomsTable
          total={total}
          models={rooms}
          onLoad={loadRooms}
          onDelete={this.openDeleteDialog}
          onEdit={this.openFormDialog}
        />

        <DeleteDialog
          id={room?.id}
          title={room?.title}
          isOpen={isDeleteDialogOpen}
          onClose={this.closeDeleteDialog}
          onConfirm={deleteRoom}
        />
      </ContentCard>
    )
  }
}

RoomsScene.propTypes = {
  redux: shape({
    rooms: arrayOf(roomShape),
    total: number,
    loadRooms: func.isRequired,
    deleteRoom: func.isRequired,
  }).isRequired,
}

const redux = (state) => ({
  rooms: select.rooms.all(state),
  total: state.rooms.status.total,
  loadRooms: actions.rooms.loadMany,
  deleteRoom: actions.rooms.destroy
})

export default withStyles(styles)(connect(redux)(RoomsScene))
