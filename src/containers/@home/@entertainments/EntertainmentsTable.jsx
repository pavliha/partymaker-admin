import React, { Component } from 'react'
import { func, arrayOf } from 'prop-types'
import entertainmentShape from 'shapes/entertainment'
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
            <TableCell minWidth="30vw">Title</TableCell>
            <TableCell minWidth={70}>Created at</TableCell>
            <TableCell minWidth={70}>Updated at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model) => (
            <TableRow key={model.id}>
              <ActionsCell align="center" model={model} onEdit={onEdit} onDelete={onDelete} />
              <TableCell align="center">{model.id}</TableCell>
              <TableCell>{model.title}</TableCell>
              <TableCell>{model.created_at}</TableCell>
              <TableCell>{model.updated_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

ShortTable.propTypes = {
  models: arrayOf(entertainmentShape).isRequired,
  onEdit: func.isRequired,
  onDelete: func.isRequired,
}

export default withTable(ShortTable)
