import React from 'react'
import Form from './Form'
import { Formik } from 'formik'

describe('<Form />', () => {

  const setup = (Component) => {
    return shallow(Component)
  }

  it('should accept form components ', () => {
    const componentFn = jest.fn(() => null)
    componentFn.mapPropsToValues = () => ({})
    componentFn.validationSchema = () => ({})
    setup(<Form component={componentFn} onSubmit={() => {}} />)
  })

  it('should handle onSubmit', () => {
    const componentFn = jest.fn(() => null)
    componentFn.mapPropsToValues = () => ({})
    componentFn.validationSchema = () => ({})
    const submitFn = jest.fn(() => Promise.resolve({}))
    const form = setup(<Form component={componentFn} onSubmit={submitFn} />)
    const formikBag = { setSubmitting: () => {}, setErrors: () => {} }
    form.find(Formik).props().onSubmit({}, formikBag)
    setTimeout(() => expect(componentFn).toBeCalled())
  })

})
