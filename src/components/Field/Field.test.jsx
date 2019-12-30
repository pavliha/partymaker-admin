import React from 'react'
import { Form, Formik } from 'formik'
import Field from './Field'
import { TextField } from '@material-ui/core'

describe('<Field />', () => {

  const setup = (Component) =>
    mount(
      <Formik onSubmit={() => null} initialValues={{ test: 'field' }}>
        <Form>
          {Component}
        </Form>
      </Formik>
    )

  it('should pass props to field component', () => {
    const componentFn = jest.fn(() => null)

    setup(<Field name="test" component={componentFn} />)

    expect(componentFn).toBeCalledWith(expect.objectContaining({
      error: false,
      fullWidth: true,
      helperText: undefined,
      name: 'test',
      onChange: expect.anything(),
      onError: expect.anything(),
      value: 'field',
    }), expect.anything())
  })

  it('should handle onChange', () => {
    const changeFn = jest.fn()

    const tree = setup(<Field name="test" component={TextField} onChange={changeFn} />)
    const textInput = tree.find(TextField).find('input')
    const event = { target: { value: 'hello' } }
    textInput.simulate('change', event)
    const form = expect.anything()
    expect(changeFn).toBeCalledWith('test', 'hello', form)
  })

})
