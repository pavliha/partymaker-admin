import React from 'react'
import CloseButton from './CloseButton'
import { IconButton } from '@material-ui/core'

describe('CloseButton', () => {

  it('displays close icon', () => {
    const tree = mount(
      <CloseButton />
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('is clickable', () => {
    const closeFn = jest.fn()
    const tree = mount(
      <CloseButton onClick={closeFn} />
    )

    tree.find(IconButton).simulate('click')
    expect(closeFn).toHaveBeenCalledTimes(1)
  })
})
