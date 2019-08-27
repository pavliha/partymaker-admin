import React from 'react'
import { array, func, number } from 'prop-types'
import { TablePagination } from 'components'

export default (Component) => {

  class TableLoader extends React.Component {
    state = {
      offset: 0,
      limit: 25,
    }

    async componentDidMount() {
      const { offset, limit } = this.state
      await this.load({ offset, limit })
    }

    load = async ({ offset, limit }) => {
      const { onLoad } = this.props
      this.setState({ isLoading: true })
      try {
        await onLoad({ offset, limit })
        this.setState({ offset, limit })
      } finally {
        this.setState({ isLoading: false })
      }
    }

    changePage = async ({ limit, offset }) => {
      const { isLoading, search } = this.state
      if (isLoading) return
      await this.load({ offset, limit, search })
    }

    changeRowsPerPage = async ({ limit, offset }) => {
      const { search } = this.state
      await this.load({ offset, limit, search })
    }

    paginated = (models) => {
      return models
    }

    render() {
      const { total, models, ...rest } = this.props
      const { offset, limit } = this.state

      return (
        <React.Fragment>
          <Component
            {...rest}
            models={this.paginated(models)}
          />
          <TablePagination
            limit={limit}
            offset={offset}
            total={total}
            onChangeRows={this.changeRowsPerPage}
            onChange={this.changePage}
          />
        </React.Fragment>
      )
    }
  }

  TableLoader.propTypes = {
    total: number,
    models: array,
    onLoad: func.isRequired,
  }

  return TableLoader
}
