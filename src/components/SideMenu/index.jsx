import React, { Fragment } from 'react'
import { string } from 'prop-types'
import userShape from 'shapes/user'
import MenuItem from './MenuItem'
import ViewDashboardIcon from 'mdi-react/ViewDashboardIcon'
import AirballoonIcon from 'mdi-react/AirballoonIcon'
import AccountGroup from 'mdi-react/AccountGroupIcon'
import MapIcon from 'mdi-react/MapMarkerIcon'
import MenuSeparator from './MenuSeparator'
import UserEditIcon from 'mdi-react/UserEditIcon'
import CartIcon from 'mdi-react/CartIcon'

const SideMenu = ({ className }) =>
  <nav className={className}>
    <MenuItem url="/dashboard" icon={ViewDashboardIcon}>Dashboard</MenuItem>
    <MenuSeparator />
    <MenuItem url="/entertainments" icon={AirballoonIcon}>Entertainments</MenuItem>
    <MenuItem url="/rooms" icon={AccountGroup}>Rooms</MenuItem>
    <MenuItem url="/places" icon={MapIcon}>Places</MenuItem>
    <MenuItem url="/orders" icon={CartIcon}>Orders</MenuItem>
    <MenuSeparator />
    <MenuItem url="/users" icon={UserEditIcon}>Users</MenuItem>
  </nav>

SideMenu.propTypes = {
  className: string.isRequired,
  user: userShape.isRequired,
}

export default SideMenu
