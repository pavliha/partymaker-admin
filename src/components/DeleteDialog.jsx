import React, { Component } from 'react'
import { shape, func, number, string } from 'prop-types'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

class DeleteDialog extends Component {

  state = {
    isLoading: false,
    error: null,
  }

  close = () => {
    const { onClose } = this.props
    this.setState({ isLoading: false, error: null })
    onClose(null)
  }

  confirm = async () => {
    const { model, onConfirm } = this.props
    try {
      this.setState({ isLoading: true })
      await onConfirm(model)
      this.close()
    } catch (error) {
      this.setState({ error: error?.message })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { model } = this.props
    const { error, isLoading } = this.state
    if (!model) return null

    return (
      <Dialog open={!!model} onClose={this.close}>
        <DialogTitle id="alert-dialog-title">Вы действительно хотите удалить "{model.title}"?</DialogTitle>
        <DialogContent>
          <DialogContentText color={error ? 'error' : 'inherit'} id="alert-dialog-description">
            {error || `Это безвозвратно удалит "${model.title}" из нашей базы данных`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.close} color="secondary">
            Отменить
          </Button>
          {!error && (
            <Button
              onClick={this.confirm}
              disabled={isLoading}
              variant="outlined"
              color="primary"
              autoFocus
            >
              {isLoading ? 'Загрузка...' : 'Удалить'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    )
  }
}

DeleteDialog.propTypes = {
  model: shape({ id: number, title: string }),
  onClose: func.isRequired,
  onConfirm: func.isRequired,
}

export default DeleteDialog
