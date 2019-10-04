import React from 'react'
import { arrayOf, func, shape } from 'prop-types'
import entertainmentShape from 'shapes/entertainment'
import { Table, TableHead } from '@material-ui/core'
import { TableActionsCell, TableBody, TableRow, TableCell, withTable } from 'components'

const EntertainmentsTable = ({ onEdit, onDelete, onActivate, table: { models, handleSort } }) =>
  <Table padding="none" size="small">
    <TableHead>
      <TableRow>
        <TableCell>Actions</TableCell>
        <TableCell align="center" width={70}>id</TableCell>
        <TableCell minWidth="30vw">Title</TableCell>
        <TableCell minWidth={40}>Places count</TableCell>
        <TableCell minWidth={70}>Updated at</TableCell>
      </TableRow>
    </TableHead>
    <TableBody onSortEnd={handleSort}>
      {models.map((model, index) => (
        <TableRow sortable index={index} key={model.id}>
          <TableActionsCell
            align="center"
            model={model}
            onEdit={onEdit}
            onDelete={onDelete}
            onActivate={onActivate}
          />
          <TableCell align="center">{model.id}</TableCell>
          <TableCell sortHandle>{model.title}</TableCell>
          <TableCell align="center">{model.places?.length}</TableCell>
          <TableCell>{model.updated_at}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>

EntertainmentsTable.propTypes = {
  onEdit: func.isRequired,
  onDelete: func.isRequired,
  onActivate: func.isRequired,
  table: shape({
    models: arrayOf(entertainmentShape).isRequired,
    handleSort: func.isRequired,
  })
}

export default withTable(EntertainmentsTable)
