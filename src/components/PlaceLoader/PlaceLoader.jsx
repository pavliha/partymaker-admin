import React from 'react'
import { node, number, object, oneOfType, string } from 'prop-types'
import { Loader } from 'components'
import { actions, connect } from 'src/redux'

const PlaceLoader = ({ redux, id, children }) =>
  <Loader load={redux.loadPlace} params={id}>
    {children}
  </Loader>

PlaceLoader.propTypes = {
  id: oneOfType([number, string]),
  redux: object.isRequired,
  children: node.isRequired,
}

const redux = () => ({
  loadPlace: actions.places.load,
})

export default connect(redux)(PlaceLoader)
