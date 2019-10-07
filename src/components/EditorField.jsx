import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { func, object, bool, string, oneOfType } from 'prop-types'
import { FormControl, FormHelperText, FormLabel, withStyles } from '@material-ui/core'

const styles = () => ({
  root: {
    flex: 1,
    overflow: 'hidden',
    paddingLeft: 5,
    display: 'inherit',
    borderRadius: 8,
    border: ' 1px solid rgba(0,0,0,0.1)',
  },

  input: {
    display: 'block',
    borderRadius: 8,
  },
  label: {},
})

class EditorField extends Component {

  onEditorStateChange = (editorState) => {
    const { name, onChange } = this.props
    onChange(name, editorState)
  }

  render() {
    const { classes, value, label, error, helperText } = this.props

    return (
      <FormControl className={classes.root}>
        <FormLabel className={classes.label} component="legend">{label}</FormLabel>
        <Editor
          editorState={value}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </FormControl>
    )
  }
}

EditorField.propTypes = {
  classes: object.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  label: string,
  error: bool,
  helperText: oneOfType([string, bool]),
}

EditorField.defaultProps = {
  label: null,
  error: false,
  helperText: null,
}

export default withStyles(styles)(EditorField)
