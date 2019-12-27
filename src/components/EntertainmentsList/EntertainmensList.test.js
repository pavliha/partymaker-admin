import React from 'react'
import EntertainmentsList from './EntertainmentsList'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { createMuiTheme } from '@material-ui/core'
import theme from 'config/theme'
import { MemoryRouter } from 'react-router-dom'
import DeleteDialog from '../DeleteDialog'
import EntertainmentsListItem from '../EntertainmentsListItem'

describe('<EntertainmentsList />', () => {

  const testProps = {
    entertainments: [
      { id: 1, title: 'Entertainment 1', places: [] },
      { id: 2, title: 'Entertainment 2', places: [] },
      { id: 3, title: 'Entertainment 3', places: [] }
    ],
    onEdit: () => {},
    onDestroy: () => {},
    onSort: () => {},
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

  it('should show entertainments', () => {
    const list = setup(<EntertainmentsList {...testProps} />)
    expect(list.text()).toContain('Entertainment 1')
    expect(list.text()).toContain('Entertainment 2')
    expect(list.text()).toContain('Entertainment 3')
  })

  it('should display list children', () => {
    const childrenFn = jest.fn()
    setup(<EntertainmentsList {...testProps} children={childrenFn} />)
    expect(childrenFn).toBeCalledTimes(testProps.entertainments.length)
  })

  it('should edit entertainment', () => {
    const editFn = jest.fn()
    const list = setup(<EntertainmentsList {...testProps} onEdit={editFn} />)
    const entertainment = testProps.entertainments[0]
    list.find(EntertainmentsListItem).first().props().onEdit(entertainment)

    expect(editFn).toBeCalledWith(entertainment)
  })

  it('should delete entertainment', () => {
    const destroyFn = jest.fn()
    const list = setup(<EntertainmentsList {...testProps} onDestroy={destroyFn} />)
    const entertainment = testProps.entertainments[0]
    list.find(DeleteDialog).first().props().onConfirm(entertainment)

    expect(destroyFn).toBeCalledWith(entertainment)
  })

})
