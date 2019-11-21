import React from 'react'
import { node, object } from 'prop-types'
import { Loader } from 'components'
import { actions, connect } from 'src/redux'

const EntertainmentsLoader = ({ redux, children }) =>
  <Loader load={redux.loadEntertainments}>
    {children}
  </Loader>

EntertainmentsLoader.propTypes = {
  redux: object.isRequired,
  children: node.isRequired,
}

const redux = () => ({
  loadEntertainments: actions.entertainments.loadMany,
})

export default connect(redux)(EntertainmentsLoader)
