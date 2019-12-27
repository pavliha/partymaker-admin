import React from 'react'
import UploadField from './UploadField'
import { FormControl, TextField } from '@material-ui/core'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import UploadFieldAdornment from 'components/UploadFieldAdornment'
import { basename } from 'path'

describe('<UploadField />', () => {

  const testProps = {
    name: 'upload',
    type: 'thumbnail',
    value: '',
    error: true,
    label: 'Label',
    helperText: 'Dummy helper text',
    onError: () => {},
    onChange: () => {},
    api: {
      uploadFile: ({ file }) => Promise.resolve({ url: `https://example.com/uploads/${file.name}` }),
      uploadUrl: ({ url }) => Promise.resolve({ url: `https://example.com/uploads/${basename(url)}` }),
      destroy: () => {}
    }
  }

  const setup = (Component) => {
    const mockStore = configureStore([])
    const store = mockStore({})
    const tree = mount(<Provider store={store}>{Component}</Provider>)
    return tree.find({ 'data-testid': 'UploadField-root' }).first()
  }

  it('should have text input', () => {
    const uploadField = setup(<UploadField {...testProps} />)
    expect(uploadField.find('input').exists()).toBeTruthy()
  })

  it('should show helper text', () => {
    const field = setup(<UploadField {...testProps} />)
    expect(field.text()).toContain('Dummy helper text')
  })

  it('should handle error', () => {
    const field = setup(<UploadField {...testProps} />)
    expect(field.find(FormControl).exists()).toBe(true)
  })

  it('should display label', () => {
    const field = setup(<UploadField {...testProps} />)
    expect(field.text()).toContain('Label')
  })

  it('should upload file', async () => {
    const changeFn = jest.fn()
    const uploadField = setup(<UploadField {...testProps} onChange={changeFn} />)

    // click add button
    const openFilesButton = uploadField.find(UploadFieldAdornment)
    openFilesButton.props().onAdd()

    // select file to upload
    const fileInput = uploadField.find({ 'data-testid': 'UploadField-file' })
    fileInput.simulate('change', { target: { files: [{ name: 'picture.jpg' }] } })

    // check if file was uploaded
    await Promise.resolve()
    expect(changeFn).toHaveBeenCalledWith('upload', 'https://example.com/uploads/picture.jpg')
  })

  it('should upload url', async () => {
    const changeFn = jest.fn()
    const uploadField = setup(<UploadField {...testProps} onChange={changeFn} />)

    // paste url
    const textInput = uploadField.find(TextField).find('input')
    textInput.simulate('change', { target: { value: 'https://somesite.com/from-url.jpg' } })

    // click upload url button
    const openFilesButton = uploadField.find(UploadFieldAdornment)
    openFilesButton.props().onUpload()

    // check if file was uploaded
    await Promise.resolve()
    expect(changeFn).toHaveBeenCalledWith('upload', 'https://example.com/uploads/from-url.jpg')
  })

  it('should upload from clipboard', async () => {
    const changeFn = jest.fn()
    const uploadField = setup(<UploadField {...testProps} onChange={changeFn} />)

    // paste clipboard data
    const textInput = uploadField.find(TextField).find('input')
    const pasteEvent = { clipboardData: { files: [{ type: 'image/png', name: 'from-clipboard.jpg' }] } }
    textInput.simulate('paste', pasteEvent)

    // click upload url button
    const openFilesButton = uploadField.find(UploadFieldAdornment)
    openFilesButton.props().onUpload()

    // check if file was uploaded
    await Promise.resolve()
    expect(changeFn).toHaveBeenCalledWith('upload', 'https://example.com/uploads/from-clipboard.jpg')
  })

  it('should show selected upload', async () => {
    const changeFn = jest.fn()
    const url = 'https://example.com/uploads/'
    const value = 'from-clipboard.jpg'
    const uploadField = setup(<UploadField {...testProps} value={`${url}${value}`} onChange={changeFn} />)
    const textInput = uploadField.find(TextField).find('input')
    expect(textInput.render().prop('value')).toBe(value)
    expect(textInput.render().prop('disabled')).toBe(true)
  })

  it('should remove selected upload', async () => {
    const changeFn = jest.fn()
    const url = 'https://example.com/uploads/'
    const value = 'from-clipboard.jpg'
    const uploadField = setup(<UploadField {...testProps} value={`${url}${value}`} onChange={changeFn} />)

    // click remove button
    const adornment = uploadField.find(UploadFieldAdornment)
    adornment.props().onDestroy()

    // check if file was uploaded
    await Promise.resolve()
    expect(changeFn).toHaveBeenCalledWith('upload', '')
  })

})
