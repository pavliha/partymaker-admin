import React from 'react'
import EditorField from './EditorField'
import { EditorState } from 'draft-js'

describe('EditorField', () => {

  it('renders empty editor field', () => {

    const tree = mount(
      <EditorField
        name="editor"
        value={EditorState.createEmpty()}
        onChange={() => {}}
        helperText="Helper text"
        error
        label="Label"
      />
    )
    expect(tree.find('.DraftEditor-editorContainer').text()).toBe('')
  })

})
