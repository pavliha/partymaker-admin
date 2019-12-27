import React from 'react'
import EntertainmentsListItem from './EntertainmentsListItem'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { createMuiTheme } from '@material-ui/core'
import theme from 'config/theme'
import { MemoryRouter } from 'react-router-dom'

describe('<EntertainmentsListItem />', () => {

  const testProps = {
    index: 1,
    entertainment: { id: 1, title: 'Entertainment 1', places: [] },
    onEdit: () => {},
    onDestroy: () => {},
  }

  const setup = (Component) => {
    const mockStore = configureStore([])
    const store = mockStore({})
    return mount(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={createMuiTheme(theme)}>
            {Component}
          </ThemeProvider>
        </MemoryRouter>
      </Provider
      >)
  }

  it('should show entertainment', () => {
    const listItem = setup(<EntertainmentsListItem {...testProps} />)
    expect(listItem.text()).toContain('Entertainment 1')
  })

  it('should edit entertainment', () => {
    const editFn = jest.fn()
    const listItem = setup(<EntertainmentsListItem {...testProps} onEdit={editFn} />)
    listItem.find({ 'data-testid': 'EntertainmentsListItem-edit' }).first().simulate('click')
    expect(editFn).toBeCalledWith(testProps.entertainment)
  })

  it('should delete entertainment', () => {
    const deleteFn = jest.fn()
    const listItem = setup(<EntertainmentsListItem {...testProps} onDelete={deleteFn} />)
    listItem.find({ 'data-testid': 'EntertainmentsListItem-delete' }).first().simulate('click')
    expect(deleteFn).toBeCalledWith(testProps.entertainment)
  })

})
