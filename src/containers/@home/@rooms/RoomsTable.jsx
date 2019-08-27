import React, { Component } from 'react'
import { func, arrayOf } from 'prop-types'
import roomShape from 'shapes/room'
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import ActionsCell from 'components/TableActionsCell'
import { TableCell, withTable } from 'components'

class ShortTable extends Component {

  render() {
    const { onEdit, onDelete, models } = this.props

    return (
      <Table padding="none" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell width={70}>id</TableCell>
            <TableCell minWidth="45vw">Name</TableCell>
            <TableCell minWidth={70}>Order</TableCell>
            <TableCell minWidth={70}>Place</TableCell>
            <TableCell minWidth={70}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model) => (
            <TableRow key={model.id}>
              <ActionsCell align="center" model={model} onEdit={onEdit} onDelete={onDelete} />
              <TableCell align="center">{model.id}</TableCell>
              <TableCell>{model.title}</TableCell>
              <TableCell align="center">{model.title}</TableCell>
              <TableCell align="center">{model.place?.title}</TableCell>
              <TableCell align="center">{model.order_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

ShortTable.propTypes = {
  models: arrayOf(roomShape).isRequired,
  onEdit: func.isRequired,
  onDelete: func.isRequired,
}

export default withTable(ShortTable)
