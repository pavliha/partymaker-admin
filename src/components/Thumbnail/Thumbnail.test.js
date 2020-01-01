import React from 'react'
import Thumbnail from 'components/Thumbnail/Thumbnail'

describe('<Thumbnail />', () => {

  it('should display picture', () => {
    const thumbnail = shallow(<Thumbnail src="fake.jpg" />).dive()
    expect(thumbnail.props().style).toStrictEqual({ backgroundImage: 'url(fake.jpg)' })
  })

  it('should handle onClick', () => {
    const clickFn = jest.fn()
    const thumbnail = shallow(<Thumbnail src="fake.jpg" onClick={clickFn} />).dive()
    thumbnail.simulate('click')
    expect(clickFn).toBeCalled()
  })

})
