import React from 'react'
import { arrayOf, func, shape } from 'prop-types'
import placeshape from 'shapes/place'
import { Table, TableHead } from '@material-ui/core'
import { TableCell, withTable, TableBody, TableRow, TableActionsCell } from 'components'

const PlacesTable = ({ onEdit, onDelete, onActivate, table: { models } }) =>
  <Table padding="none" size="small">
    <TableHead>
      <TableRow>
        <TableCell>Actions</TableCell>
        <TableCell minWidth={70}>Picture</TableCell>
        <TableCell align="center" width={70}>id</TableCell>
        <TableCell minWidth="15vw">Title</TableCell>
        <TableCell minWidth="10vw">Entertainment</TableCell>
        <TableCell minWidth={150}>Price</TableCell>
        <TableCell minWidth={200}>Working hours</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {models.map((model) => (
        <TableRow key={model.id}>
          <TableActionsCell
            align="center"
            model={model}
            onEdit={onEdit}
            onDelete={onDelete}
            onActivate={onActivate}
          />
          <TableCell>
            <img alt={model.title} src={model.picture_url} width={70} height={50} />
          </TableCell>
          <TableCell align="center">{model.id}</TableCell>
          <TableCell>{model.title}</TableCell>
          <TableCell>{model.entertainment?.title}</TableCell>
          <TableCell>{model.price}</TableCell>
          <TableCell>{model.working_hours}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>

PlacesTable.propTypes = {
  onEdit: func.isRequired,
  onDelete: func.isRequired,
  onActivate: func.isRequired,
  table: shape({
    models: arrayOf(placeshape).isRequired,
    handleSort: func.isRequired,
  })
}

export default withTable(PlacesTable)
