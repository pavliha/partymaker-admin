import React from 'react'
import { AdditionalServicesField } from './AdditionalServicesField'
import { FormHelperText } from '@material-ui/core'
import NumberField from 'components/NumberField'
import AdditionalServicesFieldTableRow from './AdditionalSevicesFieldTableRow'

describe('<AdditionalServicesField />', () => {

  const service = { id: 1, title: '200 шаров', price: 240, }

  const services = [service]

  const testProps = {
    classes: {},
    name: 'services',
    value: services,
    onChange: () => {},
    error: true,
    label: 'Label',
    helperText: 'Dummy helper text',
    redux: {
      remove: () => {}
    }
  }

  const setup = (Component) => {
    return shallow(Component)
  }

  const serviceschema = expect.objectContaining({
    price: 300,
    id: expect.anything(),
    title: 'new service'
  })

  it('should show helper text', () => {
    const field = setup(<AdditionalServicesField {...testProps} />)
    expect(field.text()).toContain('Dummy helper text')
  })

  it('should handle error', () => {
    const field = setup(<AdditionalServicesField {...testProps} />)
    expect(field.find(FormHelperText).exists()).toBe(true)
  })

  it('should display label', () => {
    const field = setup(<AdditionalServicesField {...testProps} />)
    expect(field.text()).toContain('Label')
  })

  it('should have only one empty row', () => {
    const priceField = setup(<AdditionalServicesField {...testProps} value={[]} />)
    const tr = priceField.find('tbody').find('tr')
    expect(tr).toHaveLength(1)
  })

  it('should add new price item', () => {
    const changeFn = jest.fn()
    const priceField = setup(<AdditionalServicesField {...testProps} value={[]} onChange={changeFn} />)
    const titleInput = priceField.findByTestId('AdditionalServicesField-add-title')
    const costInput = priceField.find(NumberField)
    const addButton = priceField.findByTestId('AdditionalServicesField-add')
    titleInput.props().onChange({ target: { name: 'title', value: 'new service' } })
    costInput.props().onChange(300)
    addButton.simulate('click')
    expect(changeFn).toHaveBeenCalledWith(expect.arrayContaining([serviceschema]))
  })

  it('should have 2 rows with 1 value', () => {
    const priceField = setup(<AdditionalServicesField {...testProps} />)
    expect(priceField.find(AdditionalServicesFieldTableRow)).toHaveLength(1)
  })

  it('should remove service item', () => {
    const changeFn = jest.fn()
    const priceField = setup(<AdditionalServicesField {...testProps} onChange={changeFn} />)
    priceField.find(AdditionalServicesFieldTableRow).props().onDelete(service)
    expect(changeFn).toHaveBeenCalledWith([])
  })

  it('should edit service', () => {
    const changeFn = jest.fn()
    const priceField = setup(<AdditionalServicesField {...testProps} onChange={changeFn} />)
    const updatedService = { ...service, title: 'new service', description: 'test description', price: 300 }
    priceField.find(AdditionalServicesFieldTableRow).props().onChange(updatedService)
    expect(changeFn).toHaveBeenCalledWith([updatedService])
  })
})
