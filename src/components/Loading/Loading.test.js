import React from 'react'
import Loading from './Loading'
import { CircularProgress } from '@material-ui/core'

describe('<Loading />', () => {

  it('should be invisible before timeout', () => {
    const tree = shallow(<Loading />).dive()
    tree.setState({ isVisible: false })
    expect(tree.find(CircularProgress).exists()).toBeFalsy()
  })

  it('should show progress after timeout', () => {
    const tree = shallow(<Loading />).dive()
    tree.setState({ isVisible: true })
    expect(tree.find(CircularProgress).exists()).toBeTruthy()
  })

  it('should show children when loaded', () => {
    const tree = shallow(<Loading loaded>child</Loading>).dive()
    tree.setState({ isVisible: true })
    expect(tree.text()).toContain('child')
  })

})
