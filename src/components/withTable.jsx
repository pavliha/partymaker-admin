import React from 'react'
import { array, func, number, string } from 'prop-types'
import { TablePagination } from 'components'
import arrayMove from 'array-move'

export default (Component) => {

  class TableLoader extends React.Component {
    state = {
      offset: 0,
      limit: 25,
      sorted_ids: null,
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

    list = (models) => {
      return this.sortModels(models)
    }

    sortModels = (models) => {
      const { sorted_ids } = this.state
      return sorted_ids
        ? sorted_ids.map(id => models.find(m => m.id === id))
        : models
    }

    handleSort = ({ newIndex, oldIndex }) => {
      const { models, onSort } = this.props
      const sorted_ids = arrayMove(models, oldIndex, newIndex).map(m => m.id)
      this.setState({ sorted_ids })
      onSort(sorted_ids)
    }

    render() {
      const { total, models, className, ...rest } = this.props
      const { offset, limit } = this.state

      return (
        <React.Fragment>
          <div style={{ overflow: 'auto' }}>
            <Component
              {...rest}
              table={{
                models: this.list(models),
                handleSort: this.handleSort,
              }}
            />
          </div>
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
    className: string,
    total: number,
    models: array,
    onLoad: func.isRequired,
    onSort: func,
  }

  return TableLoader
}
