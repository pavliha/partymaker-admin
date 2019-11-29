import React from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Header, Form, PlaceForm } from 'components'
import { actions, connect } from 'src/redux'

const styles = {
  root: {},
}

class CreateScene extends React.Component {

  submit = async form => {
    const { history, redux } = this.props
    const action = await redux.createPlace(form)
    history.push(`/places/${action.value.id}`)
    return action
  }

  render() {
    const { classes, history } = this.props
    return (
      <div className={classes.root}>
        <Header onBack={history.goBack} title="Добавить новое заведение" />
        <Form
          component={PlaceForm}
          onSubmit={this.submit}
          onCancel={history.goBack}
        />
      </div>
    )
  }
}

CreateScene.propTypes = {
  classes: object.isRequired,
  history: shape({ goBack: func }),
  redux: object.isRequired
}

const redux = () => ({
  createPlace: actions.places.create,
})

export default withStyles(styles)(connect(redux)(CreateScene))
