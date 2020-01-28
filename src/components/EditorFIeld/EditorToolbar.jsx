import React from 'react'
import { RichUtils } from 'draft-js'
import { object, func } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import FormatBoldIcon from 'mdi-react/FormatBoldIcon'
import FormatUnderlinedIcon from 'mdi-react/FormatUnderlinedIcon'
import FormatItalicIcon from 'mdi-react/FormatItalicIcon'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'

const styles = theme => ({
  root: {
    display: 'flex',
  },

  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },

})

class EditorToolbar extends React.Component {

  toggle = (e) => {
    const { editorState, onChange } = this.props
    const state = RichUtils.toggleInlineStyle(editorState, e.currentTarget.value)
    onChange(state)
  }

  render() {
    const { classes } = this.props

    return (
      <ToggleButtonGroup
        classes={{ grouped: classes.grouped }}
        size="small"
        onChange={this.toggle}
        className={classes.root}
      >
        <ToggleButton value="BOLD"><FormatBoldIcon /></ToggleButton>
        <ToggleButton value="ITALIC"><FormatItalicIcon /></ToggleButton>
        <ToggleButton value="UNDERLINE"><FormatUnderlinedIcon /></ToggleButton>
        <ToggleButton value="TITLE">TITLE</ToggleButton>
        <ToggleButton value="SUBTITLE">SUBTITLE</ToggleButton>
        <ToggleButton value="BODY">BODY</ToggleButton>
      </ToggleButtonGroup>
    )
  }
}

EditorToolbar.propTypes = {
  classes: object.isRequired,
  editorState: object.isRequired,
  onChange: func.isRequired,
}

export default withStyles(styles)(EditorToolbar)
