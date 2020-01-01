import React from 'react'
import NumberField from './NumberField'
import { FormControl } from '@material-ui/core'
import NumberFormat from 'react-number-format'

describe('<NumberField />', () => {

  const testProps = {
    name: 'field',
    value: 1,
    onChange: () => {},
    helperText: 'Helper text',
    error: true,
    label: 'Number label',
  }

  const setup = (Component) => mount(Component)

  it('should show helper text', () => {
    const field = setup(<NumberField {...testProps} />)
    expect(field.text()).toContain(testProps.helperText)
  })

  it('should handle error', () => {
    const field = setup(<NumberField {...testProps} />)
    expect(field.find(FormControl).exists()).toBe(true)
  })

  it('should display label', () => {
    const field = setup(<NumberField {...testProps} />)
    expect(field.text()).toContain(testProps.label)
  })

  it('should handle change', () => {
    const changeFn = jest.fn()
    const field = setup(<NumberField {...testProps} onChange={changeFn} />)
    const numberFormat = field.find(NumberFormat)
    numberFormat.props().onValueChange({ floatValue: 10 })
    expect(changeFn).toBeCalledWith(10)
  })

})
