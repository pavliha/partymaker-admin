import React from 'react'
import Navigation from './Navigation'
import Logo from 'components/Logo'
import NavigationItem from 'components/NavigationItem'

describe('<Navigation />', () => {

  it('should show logo', () => {
    const navigation = shallow(<Navigation />).dive()
    expect(navigation.find(Logo).exists()).toBeTruthy()
  })

  it('should show navigation item', () => {
    const navigation = shallow(<Navigation />).dive()
    expect(navigation.find(NavigationItem).exists()).toBeTruthy()
  })

})
