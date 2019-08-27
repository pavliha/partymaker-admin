import React, { Component } from 'react'
import { func, string } from 'prop-types'
import { Button } from '@material-ui/core'
import PlusIcon from 'mdi-react/PlusIcon'

class NewButton extends Component {

  open = () => {
    const { onOpen } = this.props
    onOpen()
  }

  render() {
    const { title } = this.props

    return (
      <Button
        variant="contained"
        onClick={this.open}
        color="primary"
        aria-label="Create"
      >
        <PlusIcon />
        {title}
      </Button>
    )
  }
}

NewButton.propTypes = {
  onOpen: func.isRequired,
  title: string.isRequired,
}

export default NewButton
