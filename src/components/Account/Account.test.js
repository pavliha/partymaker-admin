import React from 'react'
import { Account } from './Account'
import { IconButton } from '@material-ui/core'

describe('<Account />', () => {

  it('renders null without user', () => {
    const tree = shallow(<Account classes={{}} redux={{ user: null }} />)
    expect(tree.find(IconButton).exists()).toBe(false)
  })

  it('renders logout icon with user', () => {
    const tree = shallow(<Account classes={{}} redux={{ user: { name: 'Test User' } }} />)
    expect(tree.find(IconButton).exists()).toBe(true)
  })

})
