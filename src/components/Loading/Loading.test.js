import React from 'react'
import Loading from './Loading'

describe('<Loading />', () => {

  it('should render properly', () => {
    const tree = shallow(<Loading />).dive()
    expect(toJson(tree)).toMatchSnapshot()
  })

})
