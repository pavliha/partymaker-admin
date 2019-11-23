import React from 'react'
import { withStyles } from '@material-ui/core'
import { Header, PlaceLoader, Form, PlaceForm } from 'components'
import { func, object, shape } from 'prop-types'
import placeShape from 'shapes/place'
import { actions, connect, select } from 'src/redux'

const styles = {
  root: {}
}

const PlaceScene = ({ classes, match, history, redux, }) =>
  <div className={classes.root}>
    <Header title={redux.place?.title} onBack={history.goBack} />
    <PlaceLoader id={match.params.id}>
      <Form
        model={redux.place}
        component={PlaceForm}
        onSubmit={redux.updatePlace}
        onCancel={history.goBack}
      />
    </PlaceLoader>
  </div>

PlaceScene.propTypes = {
  classes: object.isRequired,
  history: shape({ goBack: func }),
  match: shape({ params: object }),
  redux: shape({
    place: placeShape,
  })
}

const redux = (state, { match }) => ({
  place: select.places.current(state, match.params.id),
  updatePlace: form => actions.places.update(match.params.id, form)
})

export default withStyles(styles)(connect(redux)(PlaceScene))
