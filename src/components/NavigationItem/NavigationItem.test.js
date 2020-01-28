import React from 'react'
import { NavigationItem } from './NavigationItem'
import { Link } from 'react-router-dom'
import DesktopMacDashboardIcon from 'mdi-react/DesktopMacDashboardIcon'

describe('<NavigationItem />', () => {

  const navItem = shallow(
    <NavigationItem
      location={{}}
      classes={{}}
      icon={DesktopMacDashboardIcon}
      url="/dummy">
      child
    </NavigationItem>
  )

  it('should have link', () => {
    expect(navItem.find(Link)).toBeTruthy()
  })

  it('should render children', () => {
    expect(navItem.text()).toContain('child')
  })

})
