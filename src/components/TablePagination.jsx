import React, { Component } from 'react'
import { number, object, func } from 'prop-types'
import { IconButton, Typography, withStyles } from '@material-ui/core'
import ArrowBackIcon from 'mdi-react/ArrowBackIcon'
import ArrowForwardIcon from 'mdi-react/ArrowForwardIcon'
import RowsPerPageSelect from './RowsPerPageSelect'
import { withRouter } from 'react-router-dom'

const styles = {
  root: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}

class HistoryTablePagination extends Component {
  back = () => {
    const { history, onChange, offset, limit, location } = this.props
    const newOffset = offset - limit

    history.push(`${location.pathname}?offset=${newOffset}&limit=${limit}`)

    onChange({ limit, offset: newOffset })
  }

  forward = () => {
    const { history, onChange, offset, limit, location } = this.props

    const newOffset = offset + limit
    history.push(`${location.pathname}?offset=${newOffset}&limit=${limit}`)

    onChange({ limit, offset: newOffset })
  }

  changeRowsPerPage = (e) => {
    const limit = e.target.value
    const { history, location, onChangeRows, offset } = this.props
    history.push(`${location.pathname}?offset=${offset}&limit=${limit}`)

    onChangeRows({ limit, offset: 0 })
  }

  render() {
    const { classes, total, limit, offset } = this.props

    if (!total) return null

    return (
      <div className={classes.root}>
        <RowsPerPageSelect rowsPerPage={[5, 10, 25]} value={limit} onChange={this.changeRowsPerPage} />
        <Typography color="textSecondary" variant="caption">
          {offset / limit + 1} of {Math.ceil(total / limit)}
        </Typography>
        <IconButton disabled={offset - limit < 0} onClick={this.back}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton disabled={offset + limit >= total} onClick={this.forward}>
          <ArrowForwardIcon />
        </IconButton>
      </div>
    )
  }
}

HistoryTablePagination.propTypes = {
  classes: object.isRequired,
  limit: number.isRequired,
  offset: number.isRequired,
  location: object.isRequired,
  history: object.isRequired,
  total: number,
  onChange: func.isRequired,
  onChangeRows: func.isRequired,
}

export default withStyles(styles)(withRouter(HistoryTablePagination))
