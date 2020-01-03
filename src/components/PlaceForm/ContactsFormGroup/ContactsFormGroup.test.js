import React from 'react'
import ContactsFormGroup from './ContactsFormGroup'

describe('<ContactsFormGroup />', () => {

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
    'phone',
    'website_url',
    'map_url',
    'address',
    'directions',
    'email',
    'instagram_url',
  ]

  it('should display contacts fields', () => {
    const form = setup(<ContactsFormGroup {...testProps} />)
    fields.forEach(field => expect(form.find({ name: `contacts.${field}` }).exists()).toBe(true))
  })
})
