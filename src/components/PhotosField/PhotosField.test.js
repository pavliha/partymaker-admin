import React from 'react'
import PhotosField from './PhotosField'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { FormControl } from '@material-ui/core'
import UploadField from 'components/UploadField'
import PhotosList from 'components/PhotosList/PhotosList'

describe('<PhotosField />', () => {

  const photos = [
    { id: 1, url: 'http://domain.com/fake.jpg' },
  ]

  const testProps = {
    name: 'photos',
    value: photos,
    onChange: () => {},
    error: true,
    label: 'Label',
    helperText: 'Dummy helper text'
  }

  const setup = (Component) => {
    const mockStore = configureStore([])
    const store = mockStore({})
    return mount(<Provider store={store}>{Component}</Provider>)
  }

  const photoSchema = expect.objectContaining({
    id: expect.anything(),
    url: 'http://domain.com/fake.jpg'
  })

  it('should show helper text', () => {
    const field = setup(<PhotosField {...testProps} />)
    expect(field.text()).toContain('Dummy helper text')
  })

  it('should handle error', () => {
    const field = setup(<PhotosField {...testProps} />)
    expect(field.find(FormControl).exists()).toBe(true)
  })

  it('should display label', () => {
    const field = setup(<PhotosField {...testProps} />)
    expect(field.text()).toContain('Label')
  })

  it('should add new photo', async () => {
    const changeFn = jest.fn()
    const field = setup(<PhotosField {...testProps} value={[]} onChange={changeFn} />)
    const uploadField = field.find(UploadField)
    uploadField.props().onChange('http://domain.com/fake.jpg')
    expect(changeFn).toBeCalledWith(expect.arrayContaining([photoSchema]))
  })

  it('should remove photo', () => {
    const changeFn = jest.fn()
    const field = setup(<PhotosField {...testProps} value={[]} onChange={changeFn} />)
    const photosList = field.find(PhotosList)
    photosList.props().onDelete({ id: 1, url: 'http://domain.com/fake.jpg' })
    expect(changeFn).toBeCalledWith([])
  })

  it('should sort photos', () => {
    const changeFn = jest.fn()
    const field = setup(<PhotosField {...testProps} value={photos} onChange={changeFn} />)
    const photosList = field.find(PhotosList)
    photosList.props().onSortEnd({ oldIndex: 1, newIndex: 2 })
    expect(changeFn).toBeCalled()
  })

})
