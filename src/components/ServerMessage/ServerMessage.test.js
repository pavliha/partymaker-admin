import React from 'react'
import { Formik } from 'formik'
import ServerMessage from './ServerMessage'

describe('<ServerMessage />', () => {

  it('should display message from formik context ', () => {
    const form = mount(
      <Formik onSubmit={() => {}} initialValues={{ non_field_errors: 'hello' }} render={() => {
        return <ServerMessage name="non_field_errors" color="error" variant="caption" />
      }} />
    )
    form.instance().setFieldError('non_field_errors', 'error message')
    form.update()
    expect(form.text()).toContain('error message')
  })
})
