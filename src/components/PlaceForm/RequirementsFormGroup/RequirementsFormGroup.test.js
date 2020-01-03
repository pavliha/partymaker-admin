import React from 'react'
import RequirementsFormGroup from './RequirementsFormGroup'

describe('<RequirementsFormGroup />', () => {

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
    'min_order_amount',
    'age_min',
    'age_max',
    'players_min',
    'players_max',
  ]

  it('should display requirements fields', () => {
    const form = setup(<RequirementsFormGroup {...testProps} />)
    fields.forEach(field => expect(form.find({ name: `requirements.${field}` }).exists()).toBe(true))
  })
})
