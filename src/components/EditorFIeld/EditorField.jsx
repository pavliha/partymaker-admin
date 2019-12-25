import React from 'react'
import { Editor } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { bool, func, object, oneOfType, string } from 'prop-types'
import { FormControl, FormHelperText, FormLabel, withStyles } from '@material-ui/core'

const styles = () => ({

  root: {
    boxSizing: 'border-box',
    padding: 15,
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    display: 'inherit',
    border: ' 1px solid rgba(0,0,0,0.1)',
    borderRadius: 5,
  },

  input: {
    display: 'block',
    borderRadius: 8,
  },

  label: {},
})

const EditorField = ({ classes, name, value, label, error, helperText, onChange }) =>
  <FormControl className={classes.root}>
    <FormLabel className={classes.label} component="legend">{label}</FormLabel>
    <Editor
      editorState={value}
      onChange={(state) => onChange(name, state)}
    />
    {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
  </FormControl>

EditorField.propTypes = {
  classes: object.isRequired,
  name: string.isRequired,
  value: object.isRequired,
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
