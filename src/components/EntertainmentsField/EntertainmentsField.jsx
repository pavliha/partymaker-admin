import React from 'react'
import { object, func, bool, string, any, oneOf, shape, arrayOf, oneOfType, number } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { DropdownField, EntertainmentsLoader } from 'components'
import { select, connect } from 'src/redux'

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
  redux: { entertainments }
}) =>
  <EntertainmentsLoader>
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
  </EntertainmentsLoader>

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
    entertainments: arrayOf(shape({
      id: oneOfType([number, string]).isRequired,
      title: string.isRequired
    }))
  })
}

const redux = state => ({
  entertainments: select.entertainments.all(state),
})

export default withStyles(styles)(connect(redux)(EntertainmentsField))
