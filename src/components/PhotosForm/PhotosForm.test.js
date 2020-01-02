import React from 'react'
import PhotosForm from './PhotosForm'
import UploadField from 'components/UploadField'

describe('<PhotosForm />', () => {

  jest.useFakeTimers()

  const setup = Component => {
    return shallow(Component).dive()
  }

  const formik = { values: { url: '' }, errors: { url: '' }, setFieldValue: () => {}, isSubmitting: false }

  it('should display upload field ', () => {
    const photosForm = setup(<PhotosForm formik={formik} />)
    expect(photosForm.find(UploadField).exists()).toBeTruthy()
  })

  it('should submit values ', () => {
    const submitFormFn = jest.fn()
    const photosForm = setup(<PhotosForm formik={{ ...formik, submitForm: submitFormFn }} />)
    const uploadField = photosForm.find(UploadField)
    uploadField.props().onChange('http://domain.com/fake.jpg')
    jest.runAllTimers()
    expect(submitFormFn).toBeCalled()
  })

  it('should handle url change ', () => {
    const setFieldValueFn = jest.fn()
    const photosForm = setup(<PhotosForm formik={{ ...formik, setFieldValue: setFieldValueFn }} />)
    const uploadField = photosForm.find(UploadField)
    uploadField.props().onChange('http://domain.com/fake.jpg')
    expect(setFieldValueFn).toBeCalled()
  })

})
