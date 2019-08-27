import React, { Component } from 'react'
import { func, arrayOf } from 'prop-types'
import placeshape from 'shapes/place'
import { Table, TableBody, TableHead, TableRow, Typography } from '@material-ui/core'
import ActionsCell from 'components/TableActionsCell'
import truncate from 'lodash/truncate'
import { TableCell, withTable } from 'components'

class PlacesTable extends Component {

  render() {
    const { onEdit, onDelete, models } = this.props

    return (
      <Table padding="none" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Actions</TableCell>
            <TableCell minWidth={70}>Picture</TableCell>
            <TableCell width={70}>id</TableCell>
            <TableCell minWidth="30vw">Title</TableCell>
            <TableCell minWidth={150}>Price</TableCell>
            <TableCell minWidth={70}>Phone</TableCell>
            <TableCell minWidth={100}>Map url</TableCell>
            <TableCell minWidth={100}>Website url</TableCell>
            <TableCell minWidth={200}>Working hours</TableCell>
            <TableCell minWidth={150}>Created at</TableCell>
            <TableCell minWidth={150}>Updated at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model) => (
            <TableRow key={model.id}>
              <ActionsCell align="center" model={model} onEdit={onEdit} onDelete={onDelete} />
              <TableCell><img alt={model.title} src={model.picture_url} width={70} height={50} /></TableCell>
              <TableCell align="center">{model.id}</TableCell>
              <TableCell>{model.title}</TableCell>
              <TableCell>{model.price}</TableCell>
              <TableCell>{model.phone}</TableCell>
              <TableCell>
                <Typography color="primary" component="a" href={model.map_url}>
                  Google Maps
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="primary" component="a" href={model.website_url}>
                  {truncate(model.website_url, { length: 30 })}
                </Typography>
              </TableCell>
              <TableCell>{model.working_hours}</TableCell>
              <TableCell>{model.created_at}</TableCell>
              <TableCell>{model.updated_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

PlacesTable.propTypes = {
  models: arrayOf(placeshape).isRequired,
  onEdit: func.isRequired,
  onDelete: func.isRequired,
}

export default withTable(PlacesTable)
