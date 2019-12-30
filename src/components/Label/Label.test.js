import React from 'react'
import Label from './Label'

describe('<Label />', () => {

  const testProps = {
    title: 'Some title',
    children: 'dummy',
    margin: 'normal'
  }

  it('should display title', () => {
    const tree = shallow(<Label {...testProps} />).dive()
    expect(tree.text()).toContain('Some title')
  })

  it('should display children', () => {
    const tree = shallow(
      <Label {...testProps}>
        <div>form</div>
      </Label>
    ).dive()
    expect(tree.text()).toContain('form')
  })
})
