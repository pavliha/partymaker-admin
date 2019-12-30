import React from 'react'
import PricesField from './PricesField'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { FormControl } from '@material-ui/core'
import NumberField from 'components/NumberField'

describe('<PricesField />', () => {

  const prices = [
    { id: 1, title: '200 шаров', cost: 240, },
  ]

  const testProps = {
    name: 'prices',
    value: prices,
    onChange: () => {},
    error: true,
    label: 'Label',
    helperText: 'Dummy helper text'
  }

  const setup = (Component) => {
    const mockStore = configureStore([])
    const store = mockStore({})
    const tree = mount(<Provider store={store}>{Component}</Provider>)
    return tree.find({ 'data-testid': 'PricesField-root' }).first()
  }

  const priceSchema = expect.objectContaining({
    cost: 300,
    id: expect.anything(),
    title: 'new service'
  })

  it('should show helper text', () => {
    const field = setup(<PricesField {...testProps} />)
    expect(field.text()).toContain('Dummy helper text')
  })

  it('should handle error', () => {
    const field = setup(<PricesField {...testProps} />)
    expect(field.find(FormControl).exists()).toBe(true)
  })

  it('should display label', () => {
    const field = setup(<PricesField {...testProps} />)
    expect(field.text()).toContain('Label')
  })

  it('should add new price item', () => {
    // setup
    const changeFn = jest.fn()
    const priceField = setup(<PricesField {...testProps} value={[]} onChange={changeFn} />)
    const tr = priceField.find('tbody').find('tr')
    expect(tr).toHaveLength(1)

    // fill title field
    const titleInput = priceField.find({ 'data-testid': 'PricesField-add-title' }).first().find('input')
    const titleEvent = { target: { name: 'title', value: 'new service' } }
    titleInput.simulate('change', titleEvent)
    expect(titleInput.render().prop('value')).toBe('new service')

    // fill price filed
    const costInput = priceField.find({ 'data-testid': 'PricesField-add-cost' }).first().find('input')
    costInput.simulate('change', { target: { value: '300', focus: () => {} } })
    expect(costInput.render().prop('value')).toBe('300 грн')

    // click add button
    const addButton = priceField.find({ 'data-testid': 'PricesField-add' }).first()
    expect(addButton.render().prop('disabled')).toBe(false)
    addButton.simulate('click')

    // see onChange response
    expect(changeFn).toHaveBeenCalledWith(expect.arrayContaining([
      priceSchema
    ]))
  })

  it('should remove price item', () => {

    // setup
    const changeFn = jest.fn()
    const priceField = setup(<PricesField {...testProps} onChange={changeFn} />)
    const tr = priceField.find('tbody').find('tr')
    expect(tr).toHaveLength(2)

    // click remove icon
    const removeIcon = tr.first().find({ 'data-testid': 'PricesField-remove' }).first()
    removeIcon.simulate('click')

    // see onChange response
    expect(changeFn).toHaveBeenCalledWith([])
  })

  it('should edit price item title', () => {

    // setup
    const changeFn = jest.fn()
    const priceField = setup(<PricesField {...testProps} onChange={changeFn} />)
    const tr = priceField.find('tbody').find({ 'data-testid': 'PricesField-tr' })

    // edit title field
    const titleInput = tr.find({ 'data-testid': 'PricesField-title' }).first().find('input')
    const titleEvent = { target: { name: 'title', value: 'new service' } }
    titleInput.simulate('change', titleEvent)

    // see onChange response
    expect(changeFn).toHaveBeenCalledWith([{ cost: 240, id: 1, title: 'new service' }])
  })

  it('should edit price item cost', () => {

    // setup
    const changeFn = jest.fn()
    const priceField = setup(<PricesField {...testProps} onChange={changeFn} />)
    const tr = priceField.find('tbody').find({ 'data-testid': 'PricesField-tr' })

    // edit cost field
    const costInput = tr.find(NumberField)
    costInput.props().onChange('cost', 300)

    // see onChange response
    expect(changeFn).toHaveBeenCalledWith([{ cost: 300, id: 1, title: '200 шаров' }])
  })

})
