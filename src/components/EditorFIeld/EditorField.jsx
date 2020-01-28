import React from 'react'
import { Editor } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { bool, func, object, oneOfType, string } from 'prop-types'
import { FormControl, FormHelperText, FormLabel } from '@material-ui/core'
import { useTheme, withStyles } from '@material-ui/styles'
import EditorToolbar from './EditorToolbar'

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

const EditorField = ({ classes, value, label, error, helperText, onChange }) => {
  const theme = useTheme()

  const styleMap = {
    'TITLE': theme.typography.h5,
    'SUBTITLE': theme.typography.subtitle2,
    'BODY': theme.typography.body1,
  }

  return (
    <FormControl className={classes.root}>
      <FormLabel className={classes.label} component="legend">{label}</FormLabel>
      <EditorToolbar editorState={value} onChange={onChange} />
      <Editor
        customStyleMap={styleMap}
        editorState={value}
        onChange={onChange}
      />
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  )
}

EditorField.propTypes = {
  classes: object.isRequired,
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
