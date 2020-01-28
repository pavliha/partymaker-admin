/* eslint-disable prefer-promise-reject-errors */
import React from 'react'
import { Loader } from './Loader'
import { wait } from 'utils'
import ErrorIcon from 'mdi-react/ErrorIcon'

describe('<Loader />', () => {

  const testProps = {
    classes: {},
    load: () => Promise.resolve(),
    children: 'dummy',
  }

  const setup = (Component) => {
    return shallow(Component)
  }

  it('should display content', async () => {
    const tree = setup(<Loader {...testProps} load={() => wait(10)} />)
    await expect(tree.text()).toContain('dummy')
  })

  it('should pass params to load prop', async () => {
    const waitFn = jest.fn()
    setup(<Loader {...testProps} load={waitFn} params={10} />)
    await expect(waitFn).toBeCalledWith(10)
  })

  it('should display error', async () => {
    const waitFn = jest.fn(() => Promise.reject('error'))
    const tree = setup(<Loader {...testProps} load={waitFn} params={10} />)
    tree.setState({ error: true })
    setTimeout(expect(tree.find(ErrorIcon).exists()).toBeTruthy())
  })

})
