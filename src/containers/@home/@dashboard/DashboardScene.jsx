import React, { Component } from 'react'
import { object } from 'prop-types'
import { TableCell, withStyles, Table } from '@material-ui/core'
import arrayMove from 'array-move'
import { TableBody, TableRow } from 'components'
import ContentCard from 'components/ContentCard'

const styles = {
  root: {},
}

class App extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }))
  }

  render() {
    const { items } = this.state

    return (
      <ContentCard title="Dashboard">
        <Table>
          <TableBody onSortEnd={this.onSortEnd}>
            {items.map((value, index) => (
              <TableRow key={`item-${value}`} index={index}>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ContentCard>
    )
  }
}

const DashboardScene = ({ classes }) =>
  <div className={classes.root}>
    <App />
  </div>

DashboardScene.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(DashboardScene)
