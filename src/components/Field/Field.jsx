import React, { Component } from 'react'
import { func, string, elementType } from 'prop-types'
import { Field as FormikField } from 'formik'

class Field extends Component {

  handleChange = (field, form) => (e) => {
    const { onChange } = this.props
    const value = e?.target?.value || e
    form.setFieldValue(field.name, value)
    onChange(field.name, value, form)
  }

  render() {
    const { name, component: Component, ...props } = this.props
    return (
      <FormikField name={name} render={({ field, form }) =>
        <Component
          {...props}
          name={field.name}
          value={field.value}
          fullWidth
          onChange={this.handleChange(field, form)}
          onError={(error) => form.setFieldError(field.name, error)}
          error={(form.submitCount > 0) && !!form.errors[field.name]}
          helperText={(form.submitCount > 0) ? form.errors[field.name] : undefined}
        />
      } />
    )
  }
}

Field.propTypes = {
  name: string,
  component: elementType,
  onChange: func,
}

Field.defaultProps = {
  onChange: () => {},
}

export default Field
