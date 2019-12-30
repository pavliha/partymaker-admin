import React from 'react'
import AdditionalServicesField from './AdditionalServicesField'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { createMuiTheme, FormControl } from '@material-ui/core'
import NumberField from 'components/NumberField'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import theme from 'config/theme'

describe('<AdditionalServicesField />', () => {

  const services = [
    { id: 1, title: '200 шаров', price: 240, },
  ]

  const testProps = {
    name: 'services',
    value: services,
    onChange: () => {},
    error: true,
    label: 'Label',
    helperText: 'Dummy helper text'
  }

  const setup = (Component) => {
    const mockStore = configureStore([])
    const store = mockStore({})
    const tree = mount(
      <Provider store={store}>
        <ThemeProvider theme={createMuiTheme(theme)}>
          {Component}
        </ThemeProvider>
      </Provider>
    )
    return tree.find({ 'data-testid': 'AdditionalServicesField-root' }).first()
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
    expect(field.find(FormControl).exists()).toBe(true)
  })

  it('should display label', () => {
    const field = setup(<AdditionalServicesField {...testProps} />)
    expect(field.text()).toContain('Label')
  })

  it('should add new price item', () => {

    // setup
    const changeFn = jest.fn()
    const priceField = setup(<AdditionalServicesField {...testProps} value={[]} onChange={changeFn} />)
    const tr = priceField.find('tbody').find('tr')
    expect(tr).toHaveLength(1)

    // fill title field
    const titleInput = priceField.find({ 'data-testid': 'AdditionalServicesField-add-title' }).first().find('input')
    const titleEvent = { target: { name: 'title', value: 'new service' } }
    titleInput.simulate('change', titleEvent)
    expect(titleInput.render().prop('value')).toBe('new service')

    // fill price filed
    const costInput = priceField.find({ 'data-testid': 'AdditionalServicesField-add-price' }).first().find('input')
    costInput.simulate('change', { target: { value: '300', focus: () => {} } })
    expect(costInput.render().prop('value')).toBe('300 грн')

    // click add button
    const addButton = priceField.find({ 'data-testid': 'AdditionalServicesField-add' }).first()
    expect(addButton.render().prop('disabled')).toBe(false)
    addButton.simulate('click')

    // see onChange response
    expect(changeFn).toHaveBeenCalledWith(expect.arrayContaining([
      serviceschema
    ]))
  })

  it('should remove service item', () => {

    // setup
    const changeFn = jest.fn()
    const priceField = setup(<AdditionalServicesField {...testProps} onChange={changeFn} />)
    const tr = priceField.find('tbody').find('tr')
    expect(tr).toHaveLength(2)

    // click remove icon
    const removeIcon = tr.first().find({ 'data-testid': 'AdditionalServicesField-remove' }).first()
    removeIcon.simulate('click')

    // see onChange response
    expect(changeFn).toHaveBeenCalledWith([])
  })

  it('should edit price item title', () => {

    // setup
    const changeFn = jest.fn()
    const priceField = setup(<AdditionalServicesField {...testProps} onChange={changeFn} />)
    const tr = priceField.find('tbody').find({ 'data-testid': 'AdditionalServicesField-tr' })

    // edit title field
    const titleInput = tr.find({ 'data-testid': 'AdditionalServicesField-title' }).first().find('input')
    const titleEvent = { target: { name: 'title', value: 'new service' } }
    titleInput.simulate('change', titleEvent)

    // see onChange response
    expect(changeFn).toHaveBeenCalledWith([{ price: 240, id: 1, title: 'new service' }])
  })

  it('should edit service item price', () => {

    // setup
    const changeFn = jest.fn()
    const priceField = setup(<AdditionalServicesField {...testProps} onChange={changeFn} />)
    const tr = priceField.find('tbody').find({ 'data-testid': 'AdditionalServicesField-tr' })

    // edit price field
    const costInput = tr.find(NumberField)
    costInput.props().onChange('price', 300)

    // see onChange response
    expect(changeFn).toHaveBeenCalledWith([{ price: 300, id: 1, title: '200 шаров' }])
  })

  it('should edit service item description', () => {

    // setup
    const changeFn = jest.fn()
    const priceField = setup(<AdditionalServicesField {...testProps} onChange={changeFn} />)
    const tr = priceField.find('tbody').find({ 'data-testid': 'AdditionalServicesField-tr' })

    // edit description field
    const descriptionInput = tr.find({ 'data-testid': 'AdditionalServicesField-description' }).first().find('input')
    const descriptionEvent = { target: { name: 'description', value: 'test description' } }
    descriptionInput.simulate('change', descriptionEvent)

    // see onChange response
    expect(changeFn).toHaveBeenCalledWith([{
      id: 1,
      price: 240,
      title: '200 шаров',
      description: 'test description'
    }])
  })

})
