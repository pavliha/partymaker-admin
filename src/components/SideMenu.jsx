import React from 'react'
import { string } from 'prop-types'
import MenuItem from './MenuItem'
import AirballoonIcon from 'mdi-react/AirballoonIcon'
import AccountGroup from 'mdi-react/AccountGroupIcon'
import MapIcon from 'mdi-react/MapMarkerIcon'
import MenuSeparator from './MenuSeparator'
import UserEditIcon from 'mdi-react/UserEditIcon'
import CartIcon from 'mdi-react/CartIcon'

const SideMenu = ({ className }) =>
  <nav className={className}>
    <MenuItem url="/entertainments" icon={AirballoonIcon}>Entertainments</MenuItem>
    <MenuItem url="/places" icon={MapIcon}>Places</MenuItem>
    <MenuItem url="/rooms" icon={AccountGroup}>Rooms</MenuItem>
    <MenuItem url="/orders" icon={CartIcon}>Orders</MenuItem>
    <MenuSeparator />
    <MenuItem url="/users" icon={UserEditIcon}>Users</MenuItem>
  </nav>

SideMenu.propTypes = {
  className: string.isRequired,
}

export default SideMenu