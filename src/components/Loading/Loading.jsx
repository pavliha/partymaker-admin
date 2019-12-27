import React, { Component } from 'react'
import { object, number, string, bool, node } from 'prop-types'
import { withStyles, CircularProgress } from '@material-ui/core'
import classNames from 'classnames'

const styles = {
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}

class Loading extends Component {
  state = {
    isVisible: false,
  }

  componentDidMount() {
    const { debounce } = this.props
    this.timer = setTimeout(() => this.setState({ isVisible: true }), debounce)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const { classes, size, color, loaded, children, className } = this.props
    const { isVisible } = this.state

    if (!isVisible) {
      return null
    }

    if (loaded) return children

    return (
      <div className={classNames(classes.root, { [className]: !!className })}>
        <CircularProgress color={color} className={classes.progress} size={size} />
      </div>
    )
  }
}

Loading.propTypes = {
  classes: object.isRequired,
  size: number,
  debounce: number,
  color: string,
  loaded: bool,
  children: node,
  className: string,
}
Loading.defaultProps = {
  size: 80,
  debounce: 700,
  color: 'primary',
  loaded: false,
  children: null,
  className: null,
}

export default withStyles(styles)(Loading)
