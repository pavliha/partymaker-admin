import React from 'react'
import { object, func, bool, string, any, oneOf, shape, arrayOf } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { DropdownField, Loader } from 'components'
import { select, connect, actions } from 'src/redux'
import entertainmentShape from 'shapes/entertainment'

const styles = {
  root: {},
}

const EntertainmentsField = ({
  classes,
  name,
  variant,
  value,
  label,
  error,
  helperText,
  onChange,
  redux: { entertainments, loadEntertainments }
}) =>
  <Loader load={loadEntertainments}>
    <DropdownField
      nonEmpty
      classes={classes}
      name={name}
      value={value}
      label={label}
      variant={variant}
      error={error}
      items={entertainments.map(e => ({ label: e.title, value: e.id }))}
      helperText={helperText}
      onChange={onChange}
    />
  </Loader>

EntertainmentsField.propTypes = {
  classes: object,
  name: string.isRequired,
  value: any,
  label: string,
  variant: oneOf(['standard', 'outlined', 'filled']),
  error: bool,
  helperText: string,
  onChange: func.isRequired,
  redux: shape({
    entertainments: arrayOf(entertainmentShape)
  })
}

const redux = state => ({
  entertainments: select.entertainments.all(state),
  loadEntertainments: actions.entertainments.loadMany
})

export default withStyles(styles)(connect(redux)(EntertainmentsField))