import React, { Component } from 'react'
import { bool, func, number, string } from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

class DeleteDialog extends Component {

  state = {
    isLoading: false,
    error: null,
  }

  close = () => {
    const { onClose } = this.props
    this.setState({ isLoading: false, error: null })
    onClose()
  }

  confirm = async () => {
    const { id, onConfirm } = this.props
    try {
      this.setState({ isLoading: true })
      await onConfirm(id)
      this.close()
    } catch (error) {
      this.setState({ error: error?.message })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { title, isOpen } = this.props
    const { error, isLoading } = this.state
    if (!isOpen) return null

    return (
      <Dialog
        open={isOpen}
        onClose={this.close}
        aria-labelledby="delete-company-dialog"
        aria-describedby="delete-company-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete "{title}"?</DialogTitle>
        <DialogContent>
          <DialogContentText color={error ? 'error' : 'default'} id="alert-dialog-description">
            {error || `This will completely remove "${title}" from our database`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.close} color="secondary">
            Cancel
          </Button>
          {!error && (
            <Button
              onClick={this.confirm}
              disabled={isLoading}
              variant="outlined"
              color="primary"
              autoFocus
            >
              {isLoading ? 'loading...' : 'Delete'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    )
  }
}

DeleteDialog.propTypes = {
  isOpen: bool.isRequired,
  id: number,
  title: string,
  onClose: func.isRequired,
  onConfirm: func.isRequired,
}

export default DeleteDialog
