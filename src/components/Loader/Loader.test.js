/* eslint-disable prefer-promise-reject-errors */
import React from 'react'
import Loader from './Loader'
import { wait } from 'utils'
import ErrorIcon from 'mdi-react/ErrorIcon'

describe('<Loader />', () => {

  const testProps = {
    load: () => Promise.resolve(),
    children: 'dummy',
  }

  it('should display content', async () => {
    const tree = shallow(<Loader {...testProps} load={() => wait(10)} />).dive()
    await expect(tree.text()).toContain('dummy')
  })

  it('should pass params to load prop', async () => {
    const waitFn = jest.fn()
    mount(<Loader {...testProps} load={waitFn} params={10} />)
    await expect(waitFn).toBeCalledWith(10)
  })

  it('should display error', async () => {
    const waitFn = jest.fn(() => Promise.reject('error'))
    const loader = shallow(<Loader {...testProps} load={waitFn} params={10} />).dive()
    loader.setState({ error: true })
    setTimeout(expect(loader.find(ErrorIcon).exists()).toBeTruthy())
  })

})
