import React from 'react'
import { string } from 'prop-types'
import ArrowAllIcon from 'mdi-react/ArrowAllIcon'
import { SortableHandle } from 'react-sortable-hoc'

const PlaceListItemHandle = ({ className }) =>
  <ArrowAllIcon className={className} />

PlaceListItemHandle.propTypes = {
  className: string.isRequired,
}

export default SortableHandle(PlaceListItemHandle)
