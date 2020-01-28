// eslint-disable-next-line
import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import ShallowWrapper from 'enzyme/ShallowWrapper'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

global.shallow = shallow
global.render = render
global.mount = mount
global.toJson = toJson
React.useLayoutEffect = React.useEffect

ShallowWrapper.prototype.findByTestId = function(attr) {
  return this.find(`[data-testid="${attr}"]`)
}

// Fail tests on any warning
console.error = message => {
  throw new Error(message)
}
