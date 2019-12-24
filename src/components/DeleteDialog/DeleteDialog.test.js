import React from 'react'
import DeleteDialog from './DeleteDialog'

describe('DeleteDialog', () => {

  it('displays title', () => {
    const tree = shallow(
      <DeleteDialog
        model={{ id: 1, title: 'Some Title' }}
        title="Some title"
        onConfirm={() => {}}
        onClose={() => {}}
      />
    )
    expect(tree.find('#DeleteDialog-title').text()).toContain('Some Title')
  })

  it('checks confirm button is clickable', () => {
    const confirmFn = jest.fn()
    const tree = shallow(
      <DeleteDialog
        model={{ id: 1, title: 'Some Title' }}
        title="Some title"
        onConfirm={confirmFn}
        onClose={() => {}}
      />
    )
    const confirmButton = tree.find('#DeleteDialog-confirm')
    confirmButton.simulate('click')
    expect(confirmFn).toHaveBeenCalledTimes(1)
  })

  it('checks confirm button is clickable', () => {
    const cancelFn = jest.fn()
    const tree = shallow(
      <DeleteDialog
        model={{ id: 1, title: 'Some Title' }}
        title="Some title"
        onConfirm={() => {}}
        onClose={cancelFn}
      />
    )
    const confirmButton = tree.find('#DeleteDialog-cancel')
    confirmButton.simulate('click')
    expect(cancelFn).toHaveBeenCalledTimes(1)
  })
})
