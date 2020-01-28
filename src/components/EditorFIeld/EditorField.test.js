import React from 'react'
import { EditorField } from './EditorField'
import { EditorState } from 'draft-js'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import theme from 'config/theme'

describe('EditorField', () => {

  it('renders empty editor field', () => {

    const tree = mount(
      <ThemeProvider theme={createMuiTheme(theme)}>
        <EditorField
          classes={{}}
          name="editor"
          value={EditorState.createEmpty()}
          onChange={() => {}}
          helperText="Helper text"
          error
          label="Label"
        />
      </ThemeProvider>
    )
    expect(tree.find('.DraftEditor-editorContainer').text()).toBe('')
  })

})
