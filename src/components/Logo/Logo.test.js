import React from 'react'
import Logo from './Logo'

describe('<Logo />', () => {

  it('should display project name ', () => {
    const tree = shallow(<Logo />).dive()

    expect(tree.text()).toContain('Partymaker')
  })

})
