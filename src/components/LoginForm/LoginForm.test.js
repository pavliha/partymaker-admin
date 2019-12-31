import React from 'react'
import LoginForm from './LoginForm'

describe('<LoginForm />', () => {

  const testProps = {
    formik: {
      isSubmitting: false,
    }
  }

  const setup = (Component) => {
    return shallow(Component).dive()
  }

  it('should display email field', () => {
    const form = setup(<LoginForm {...testProps} />)
    expect(form.find({ name: 'email' }).exists()).toBe(true)
  })

  it('should display password field', () => {
    const form = setup(<LoginForm {...testProps} />)
    expect(form.find({ name: 'password' }).exists()).toBe(true)
  })

  it('should handle non field errors', () => {
    const form = setup(<LoginForm {...testProps} />)
    expect(form.find({ name: 'non_field_error' }).exists()).toBe(true)
  })

  it('should have submit button', () => {
    const form = setup(<LoginForm {...testProps} />)
    expect(form.find({ type: 'submit' }).exists()).toBe(true)
  })
})
