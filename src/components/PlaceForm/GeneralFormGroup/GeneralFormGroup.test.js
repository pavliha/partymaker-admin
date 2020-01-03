import React from 'react'
import GeneralFormGroup from './GeneralFormGroup'

describe('<GeneralFormGroup />', () => {

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
    'title',
    'picture_url',
    'price',
    'working_hours',
    'entertainment_id',
  ]

  it('should display general fields', () => {
    const form = setup(<GeneralFormGroup {...testProps} />)
    fields.forEach(field => expect(form.find({ name: field }).exists()).toBe(true))
  })
})
