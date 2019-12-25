import React from 'react'
import UploadField from './UploadField'

describe('EditorField', () => {

  it('renders empty', () => {

    const tree = mount(
      <UploadField
        name="upload"
        value=""
        onChange={() => {}}
        helperText="Helper text"
        error
        label="Label"
        onError={() => {}}
        api={{
          uploadFile: () => {},
          uploadUrl: () => {},
          destroy: () => {}
        }}
      />
    )

    expect(toJson(tree)).toMatchSnapshot()
  })

})
