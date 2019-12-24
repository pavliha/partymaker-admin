/* eslint-disable no-return-await */
import React, { useState } from 'react'
import { object } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import { actions, connect, select } from 'src/redux'
import AddCircleOutlineIcon from 'mdi-react/AddCircleOutlineIcon'
import { Form, EntertainmentsList, EntertainmentsLoader, Header, EntertainmentForm, FormDialog } from 'components'
import arrayMove from 'array-move'

const styles = {
  root: {
    maxWidth: 1050,
  },
}

const PlacesScene = ({ classes, redux }) => {
  const [isFormDialogOpen, setFormDialogOpen] = useState(false)
  const [entertainment, setEntertainment] = useState(null)

  const openEditor = (entertainment) => {
    setEntertainment(entertainment)
    setFormDialogOpen(true)
  }
  const closeEditor = () => {
    setEntertainment(null)
    setFormDialogOpen(false)
  }

  const sortEntertainments = ({ oldIndex, newIndex }) => {
    const entertainments = arrayMove(redux.entertainments, oldIndex, newIndex)
    const toSort = entertainments.map((entertainment, order) => ({ ...entertainment, order }))
    redux.sort(toSort)
  }

  return (
    <div className={classes.root}>
      <Header
        title="Заведения"
        action={(
          <IconButton color="secondary" onClick={() => setFormDialogOpen(true)}>
            <AddCircleOutlineIcon />
          </IconButton>
        )}
      />
      <EntertainmentsLoader>
        <EntertainmentsList
          useDragHandle
          entertainments={redux.entertainments}
          onEdit={openEditor}
          onDestroy={redux.destroyEntertainment}
          onSortEnd={sortEntertainments}
        />
      </EntertainmentsLoader>
      <FormDialog
        isOpen={isFormDialogOpen}
        title={entertainment?.title || 'Добавить тип заведения'}
        onClose={closeEditor}
      >
        <Form
          model={entertainment}
          component={EntertainmentForm}
          onSubmit={form => redux.submitEntertainment(entertainment?.id, form)}
          onCancel={() => setFormDialogOpen(false)}
        />
      </FormDialog>
    </div>
  )
}

PlacesScene.propTypes = {
  classes: object.isRequired,
  redux: object.isRequired,
}

const redux = (state) => ({
  entertainments: select.entertainments.all(state),
  destroyEntertainment: entertainment => actions.entertainments.destroy(entertainment.id),
  submitEntertainment: (id, form) => id
    ? actions.entertainments.update(id, form)
    : actions.entertainments.create(form),
  sort: actions.entertainments.sort,
})

export default withStyles(styles)(connect(redux)(PlacesScene))
