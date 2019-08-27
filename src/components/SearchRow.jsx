import React from 'react'
import { bool } from 'prop-types'
import TableRow from '@material-ui/core/TableRow'
import isEmpty from 'lodash/isEmpty'

const SearchRow = ({ models, isLoading, ...props }) => {
  if (!isEmpty(models)) return <TableRow {...props} />
  return !isLoading && <TableRow {...props} />
}

SearchRow.propTypes = {
  isLoading: bool,
}

export default SearchRow
