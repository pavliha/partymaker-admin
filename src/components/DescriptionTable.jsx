import React, { Component } from 'react'
import { func } from 'prop-types'
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import ActionsCell from 'components/TableActionsCell'
import { TableDataHandler } from 'components/TableLoader'
import { Input, TableCell } from 'components'

class DescriptionTable extends Component {

  static contextType = TableDataHandler

  render() {
    const { onEdit, onDelete } = this.props
    const { models, onSearch } = this.context

    return (
      <Table padding="none" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell width={70}>id</TableCell>
            <TableCell minWidth={200}>Name</TableCell>
            <TableCell minWidth="50vw">Description</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell><Input name="id__startswith" onChange={onSearch} /></TableCell>
            <TableCell><Input name="title__icontains" onChange={onSearch} /></TableCell>
            <TableCell><Input name="description__icontains" onChange={onSearch} /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map(model =>
            <TableRow key={model.id}>
              <ActionsCell align="center" model={model} onEdit={onEdit} onDelete={onDelete} />
              <TableCell align="center">{model.id}</TableCell>
              <TableCell>{model.title}</TableCell>
              <TableCell>{model.description}</TableCell>
            </TableRow>,
          )}
        </TableBody>
      </Table>
    )
  }
}

DescriptionTable.propTypes = {
  onEdit: func.isRequired,
  onDelete: func.isRequired,
}

export default DescriptionTable
