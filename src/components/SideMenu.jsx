import React from 'react'
import { string } from 'prop-types'
import MenuItem from './MenuItem'
import AirballoonIcon from 'mdi-react/AirballoonIcon'
import MapIcon from 'mdi-react/MapMarkerIcon'

const SideMenu = ({ className }) =>
  <nav className={className}>
    <MenuItem url="/entertainments" icon={AirballoonIcon}>Entertainments</MenuItem>
    <MenuItem url="/places" icon={MapIcon}>Places</MenuItem>
  </nav>

SideMenu.propTypes = {
  className: string.isRequired,
}

export default SideMenu
