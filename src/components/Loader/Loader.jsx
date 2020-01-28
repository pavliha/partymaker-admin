import React, { Component } from 'react'
import { func, node, object, any, bool } from 'prop-types'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Loading } from 'components'
import ErrorIcon from 'mdi-react/ErrorIcon'
import isEqual from 'lodash/isEqual'

const styles = theme => ({

  root: {},

  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    width: 100,
    height: 100,
    color: theme.palette.error.main
  }
})

export class Loader extends Component {

  isMounted = false

  state = {
    isLoading: false,
    error: null,
  }

  async componentDidMount() {
    const { params } = this.props
    await this.load(params)
  }

  componentWillUnmount() {
    this.isMounted = false
  }

  safeSetState(state) {
    if (!this.isMounted) return
    this.setState(state)
  }

  async shouldComponentUpdate(next) {
    const prev = this.props
    if (isEqual(prev.params, next.params)) return
    await this.load(next.params)
  }

  load = async (params) => {
    const { cancel, load } = this.props
    if (cancel) return
    try {
      this.safeSetState({ error: null, isLoading: true })
      await load(params)
      this.safeSetState({ isLoading: false })
    } catch (error) {
      this.safeSetState({ error, isLoading: false })
    }
  }

  render() {
    const { classes, children } = this.props
    const { isLoading, error } = this.state

    if (error) {
      return (
        <div className={classes.container}>
          <div className={classes.errorContainer}>
            <ErrorIcon className={classes.error} />
            <Typography color="textSecondary">{error.message}</Typography>
            <Typography color="textSecondary">{error.error?.message}</Typography>
          </div>
        </div>
      )
    }

    if (isLoading) {
      return (
        <div className={classes.container}>
          <Loading />
        </div>
      )
    }

    return children
  }
}

Loader.propTypes = {
  classes: object.isRequired,
  cancel: bool,
  params: any,
  load: func.isRequired,
  children: node,
}

export default withStyles(styles)(Loader)
