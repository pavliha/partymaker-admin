import React from 'react'
import PlaceForm from './PlaceForm'

describe('<PlaceForm />', () => {

  const testProps = {
    formik: {
      isSubmitting: false,
    },
    onCancel: () => {}
  }

  const setup = (Component) => {
    return shallow(Component).dive()
  }

  const fields = [
    'additional_services',
    'description',
  ]

  it('should display place fields', () => {
    const form = setup(<PlaceForm {...testProps} />)
    fields.forEach(field => expect(form.find({ name: field }).exists()).toBe(true))
  })

  it('should display submit button', () => {
    const form = setup(<PlaceForm {...testProps} />)
    expect(form.find({ type: 'submit' }).exists()).toBeTruthy()
  })
})
