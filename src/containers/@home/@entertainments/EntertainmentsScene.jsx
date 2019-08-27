/* eslint-disable no-return-await */
import React, { Component } from 'react'
import { func, number, shape, arrayOf } from 'prop-types'
import entertainmentShape from 'shapes/entertainment'
import { withStyles } from '@material-ui/core'
import { ContentCard, FormDialog, DeleteDialog, NewButton } from 'components'
import EntertainmentForm from './EntertainmentForm'
import EntertainmentsTable from './EntertainmentsTable'
import { actions, select, connect } from 'src/redux'

const styles = {
  root: {},
}

class EntertainmentsScene extends Component {

  state = {
    isDeleteDialogOpen: false,
    isEntertainmentDialogOpen: false,
  }

  openFormDialog = (entertainment) =>
    this.setState({ isEntertainmentDialogOpen: true, entertainment })

  closeEntertainmentDialog = () =>
    this.setState({ isEntertainmentDialogOpen: false, entertainment: null })

  openDeleteDialog = (entertainment) =>
    this.setState({ isDeleteDialogOpen: true, entertainment })

  closeDeleteDialog = () =>
    this.setState({ isDeleteDialogOpen: false, entertainment: null })

  updateOrCreateEntertainment = async ({ id, form }) => {
    const { redux: { updateEntertainment, createEntertainment } } = this.props
    const action = await (id ? updateEntertainment(id, form) : createEntertainment(form))
    this.closeEntertainmentDialog()

    return action
  }

  render() {
    const { redux: { entertainments, total, loadEntertainments, deleteEntertainment } } = this.props
    const { isEntertainmentDialogOpen, isDeleteDialogOpen, entertainment } = this.state

    return (
      <ContentCard
        title="Entertainments"
        action={<NewButton title="New entertainment" onOpen={this.openFormDialog} />}
      >
        <EntertainmentsTable
          total={total}
          models={entertainments}
          onLoad={loadEntertainments}
          onDelete={this.openDeleteDialog}
          onEdit={this.openFormDialog}
        />

        <DeleteDialog
          id={entertainment?.id}
          title={entertainment?.title}
          isOpen={isDeleteDialogOpen}
          onClose={this.closeDeleteDialog}
          onConfirm={deleteEntertainment}
        />

        <FormDialog
          title={`${entertainment ? 'Edit entertainment:' : 'New entertainment'}  ${entertainment?.title || ''}`}
          isOpen={isEntertainmentDialogOpen}
          onClose={this.closeEntertainmentDialog} isEdit={!!entertainment}
        >
          <EntertainmentForm
            model={entertainment}
            onCancel={this.closeEntertainmentDialog}
            onSubmit={this.updateOrCreateEntertainment}
          />
        </FormDialog>

      </ContentCard>
    )
  }
}

EntertainmentsScene.propTypes = {
  redux: shape({
    entertainments: arrayOf(entertainmentShape),
    total: number,
    loadEntertainments: func.isRequired,
    createEntertainment: func.isRequired,
    updateEntertainment: func.isRequired,
    deleteEntertainment: func.isRequired,
  }).isRequired,
}

const redux = (state) => ({
  entertainments: select.entertainments.all(state),
  total: state.entertainments.status.total,
  loadEntertainments: actions.entertainments.loadMany,
  createEntertainment: actions.entertainments.create,
  updateEntertainment: actions.entertainments.update,
  deleteEntertainment: actions.entertainments.destroy
})

export default withStyles(styles)(connect(redux)(EntertainmentsScene))
