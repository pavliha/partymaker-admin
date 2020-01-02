import React from 'react'
import Header from './Header'
import { IconButton } from '@material-ui/core'

describe('<Header />', () => {

  const setup = (Component) => shallow(Component).dive()

  it('should display title', () => {
    const header = setup(<Header title="Some title" />)
    expect(header.text()).toContain('Some title')
  })

  it('should display action', () => {
    const header = setup(<Header action="Some title" />)
    expect(header.text()).toContain('Some title')
  })

  it('should handle onBack', () => {
    const backFn = jest.fn()
    const header = setup(<Header action="Some title" onBack={backFn} />)
    header.find(IconButton).simulate('click')
    expect(backFn).toBeCalled()
  })

})
