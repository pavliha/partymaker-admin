import React from 'react'
import Loader from './Loader'
import wait from 'utils/wait'

describe('<Loader />', () => {

  const testProps = {
    load: () => Promise.resolve(),
    children: 'dummy',
  }

  it('should display content', async () => {
    const tree = shallow(<Loader {...testProps} load={() => wait(10)} />).dive()
    await expect(tree.text()).toContain('dummy')
  })

})
