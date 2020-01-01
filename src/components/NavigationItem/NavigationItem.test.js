import React from 'react'
import NavigationItem from './NavigationItem'
import { Link, MemoryRouter } from 'react-router-dom'
import DesktopMacDashboardIcon from 'mdi-react/DesktopMacDashboardIcon'

describe('<NavigationItem />', () => {

  const navItem = mount(
    <MemoryRouter>
      <NavigationItem icon={DesktopMacDashboardIcon} url="/dummy">child</NavigationItem>
    </MemoryRouter>
  )

  it('should have link', () => {
    expect(navItem.find(Link)).toBeTruthy()
  })

  it('should render children', () => {
    expect(navItem.text()).toContain('child')
  })

})
