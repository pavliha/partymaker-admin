import React from 'react'
import FormDialog from './FormDialog'
import { IconButton } from '@material-ui/core'

describe('<FormDialog />', () => {

  const testProps = {
    title: 'Some title',
    isOpen: true,
    onClose: () => {},
    children: 'dummy',
  }

  it('should not render when is not open', () => {
    const tree = shallow(<FormDialog {...testProps} isOpen={false} />).dive()
    expect(tree.instance()).toBeNull()
  })

  it('should display title', () => {
    const tree = shallow(<FormDialog {...testProps} />).dive()
    expect(tree.text()).toContain('Some title')
  })

  it('should display form', () => {
    const tree = shallow(
      <FormDialog {...testProps}>
        <div>form</div>
      </FormDialog>
    ).dive()
    expect(tree.text()).toContain('form')
  })

  it('should close', () => {
    const closeFn = jest.fn()
    const tree = shallow(
      <FormDialog {...testProps} onClose={closeFn}>
        <div>form</div>
      </FormDialog>
    ).dive()

    tree.find(IconButton).simulate('click')
    expect(closeFn).toBeCalled()
  })

})
