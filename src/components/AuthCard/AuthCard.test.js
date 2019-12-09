import React from 'react'
import renderer from 'react-test-renderer'
import AuthCard from './AuthCard'

describe('AuthCard', () => {
  it('it displays title', () => {
    const tree = renderer.create(<AuthCard title="Some title" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('it displays children and title', () => {
    const tree = renderer.create(
      <AuthCard title="Some title">
        <div>any react node</div>
      </AuthCard>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
