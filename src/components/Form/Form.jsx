import React, { Component } from 'react'
import { Formik } from 'formik'
import { object, func, elementType } from 'prop-types'
import transformValidationApi from 'utils/transformValidationApi'
import isPromise from 'is-promise'

class Form extends Component {

  submit = async (form, formikBag) => {
    const { setSubmitting, setErrors } = formikBag
    const { onSubmit } = this.props
    const submit = onSubmit(form)
    if (!isPromise(submit)) {
      throw new Error('onSubmit should return promise with result and errors')
    }

    try {
      setSubmitting(true)
      return await submit
    } catch (error) {
      setErrors(transformValidationApi(error))
    } finally {
      setSubmitting(false)
    }
  }

  handleSubmit = (form, formikBag) => {
    const { component: Component, ...props } = this.props
    if (!Component.handleSubmit) return this.submit(form, formikBag)

    return Component.handleSubmit(form, { ...formikBag, props })
  }

  render() {
    const { component: Component, innerRef, ...props } = this.props
    const { validationSchema, mapPropsToValues } = Component

    return (
      <Formik
        enableReinitialize
        ref={innerRef}
        validationSchema={validationSchema}
        initialValues={mapPropsToValues(props)}
        render={(formik) => <Component formik={formik} {...props} />}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

Form.propTypes = {
  component: elementType.isRequired,
  innerRef: object,
  onSubmit: func.isRequired,
}

export default Form
