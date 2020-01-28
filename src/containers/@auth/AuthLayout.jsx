import React, { lazy, Suspense } from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Loading } from 'components'

const LoginScene = lazy(() => import('./@login/LoginScene'))

const styles = () => ({
  root: {
    height: '100vh',
    background: `rgba(0, 0, 0, 0.05)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scene: {
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 15,
  },
  divider: {
    color: 'white',
  },
  header: {
    position: 'absolute',
    background: 'transparent',
    boxShadow: 'none',
  },
})

const AuthLayout = (props) => {
  const { classes } = props
  return (
    <div className={classes.root} id="AuthLayout">
      <div className={classes.container}>
        <div className={classes.scene}>
          <div>
            <Suspense fallback={<Loading center />}>
              <Switch>
                <Route exact path="/auth/login" component={LoginScene} />
                <Redirect to="/auth/login" />
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

AuthLayout.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(AuthLayout)
