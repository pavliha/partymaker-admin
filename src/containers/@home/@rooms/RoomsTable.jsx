import React from 'react'
import { arrayOf, func } from 'prop-types'
import roomShape from 'shapes/room'
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import ActionsCell from 'components/TableActionsCell'
import { TableCell, withTable } from 'components'

const RoomsTable = ({ models, onEdit, onDelete }) =>
  <Table padding="none" size="small">
    <TableHead>
      <TableRow>
        <TableCell>Actions</TableCell>
        <TableCell align="center" width={70}>id</TableCell>
        <TableCell minWidth="30vw">Title</TableCell>
        <TableCell minWidth={200}>Place</TableCell>
        <TableCell minWidth={70}>Order id</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {models.map((model) => (
        <TableRow key={model.id}>
          <ActionsCell align="center" model={model} onEdit={onEdit} onDelete={onDelete} />
          <TableCell align="center">{model.id}</TableCell>
          <TableCell>{model.title}</TableCell>
          <TableCell>{model.place?.title}</TableCell>
          <TableCell align="center">{model.order_id}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>

RoomsTable.propTypes = {
  models: arrayOf(roomShape).isRequired,
  onEdit: func.isRequired,
  onDelete: func.isRequired,
}

export default withTable(RoomsTable)
