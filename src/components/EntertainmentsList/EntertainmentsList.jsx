import React, { useState } from 'react'
import { object, arrayOf, func, shape, number, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { DeleteDialog, EntertainmentsListItem } from 'components'
import { SortableContainer } from 'react-sortable-hoc'

const styles = () => ({
  root: {},
})

const EntertainmentsList = ({ classes, entertainments, onEdit, onDestroy, children }) => {
  const [entertainment, setEntertainment] = useState(null)

  return (
    <div className={classes.root}>
      {entertainments.map((entertainment, index) => (
        <EntertainmentsListItem
          index={index}
          key={index}
          entertainment={entertainment}
          onDelete={setEntertainment}
          onEdit={onEdit}
        >
          {children(entertainment)}
        </EntertainmentsListItem>
      ))}
      <DeleteDialog
        model={entertainment}
        onClose={setEntertainment}
        onConfirm={onDestroy}
      />
    </div>
  )
}

EntertainmentsList.propTypes = {
  classes: object.isRequired,
  entertainments: arrayOf(shape({
    id: number.isRequired,
    title: string,
  })),
  onEdit: func.isRequired,
  onDestroy: func.isRequired,
  children: func,
}

EntertainmentsList.defaultProps = {
  children: () => {}
}

export default withStyles(styles)(SortableContainer(EntertainmentsList))
