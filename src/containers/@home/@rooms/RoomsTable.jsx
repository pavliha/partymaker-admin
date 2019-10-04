import React from 'react'
import { arrayOf, func, shape } from 'prop-types'
import roomShape from 'shapes/room'
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import { TableCell, withTable, TableActionsCell } from 'components'

const RoomsTable = ({ table: { models }, onDelete }) =>
  <Table padding="none" size="small">
    <TableHead>
      <TableRow>
        <TableCell>Actions</TableCell>
        <TableCell align="center" width={70}>id</TableCell>
        <TableCell minWidth="15vw">Title</TableCell>
        <TableCell minWidth={200}>Place</TableCell>
        <TableCell minWidth={200}>Invite token</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {models.map((model) => (
        <TableRow key={model.id}>
          <TableActionsCell align="center" model={model} onDelete={onDelete} />
          <TableCell align="center">{model.id}</TableCell>
          <TableCell>{model.title}</TableCell>
          <TableCell>{model.place?.title}</TableCell>
          <TableCell>{model.invite_token}</TableCell>
          <TableCell align="center">{model.order_id}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>

RoomsTable.propTypes = {
  onDelete: func.isRequired,
  table: shape({
    models: arrayOf(roomShape).isRequired,
  })
}

export default withTable(RoomsTable)
