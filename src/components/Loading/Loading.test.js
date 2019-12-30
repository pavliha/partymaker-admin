import React from 'react'
import Loading from './Loading'

describe('<Loading />', () => {

  it('should render properly', () => {
    const tree = mount(<Loading />)
    expect(toJson(tree)).toMatchSnapshot()
  })

})
