import React from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Header } from 'components'

const styles = {
  root: {},
}

const CreateScene = ({ classes, history }) =>
  <div className={classes.root}>
    <Header onBack={history.goBack} title="Добавить новое заведение" />
  </div>

CreateScene.propTypes = {
  classes: object.isRequired,
  history: shape({ goBack: func })
}

export default withStyles(styles)(CreateScene)
