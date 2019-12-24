import React from 'react'
import AuthCard from './AuthCard'

describe('AuthCard', () => {
  it('it displays title', () => {
    const tree = mount(<AuthCard title="Some title" />)
    expect(toJson(tree)).toMatchSnapshot()
  })

  it('it displays children and title', () => {
    const tree = mount(
      <AuthCard title="Some title">
        <div>any react node</div>
      </AuthCard>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

})
