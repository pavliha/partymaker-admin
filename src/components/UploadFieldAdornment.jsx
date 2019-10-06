import React from 'react'
import { object, func, string, number } from 'prop-types'
import { CircularProgress, IconButton, withStyles } from '@material-ui/core'
import assetShape from 'shapes/asset'
import PlusIcon from 'mdi-react/PlusIcon'
import UploadIcon from 'mdi-react/UploadIcon'
import ErrorIcon from 'mdi-react/ErrorIcon'
import TrashIcon from 'mdi-react/TrashIcon'

const styles = {
  root: {},
  iconButton: {
    padding: 2,
    marginRight: 0,
    marginBottom: 4,
  }
}

const UploadFieldAdornment = ({ classes, error, url, loading, asset, onUpload, onDestroy, onAdd }) => {

  if (error) {
    return <IconButton className={classes.iconButton} onClick={onUpload}><ErrorIcon /></IconButton>
  }

  if (loading) {
    return <CircularProgress className={classes.progress} variant="determinate" value={loading} />
  }

  if (asset) {
    return <IconButton className={classes.iconButton} onClick={onDestroy}><TrashIcon /></IconButton>
  }

  if (url) {
    return <IconButton className={classes.iconButton} onClick={onUpload}><UploadIcon /></IconButton>
  }

  return <IconButton className={classes.iconButton} onClick={onAdd}><PlusIcon /></IconButton>
}

UploadFieldAdornment.propTypes = {
  classes: object.isRequired,
  error: string,
  loading: number,
  url: string,
  asset: assetShape,
  onUpload: func,
  onDestroy: func,
  onAdd: func,
}

export default withStyles(styles)(UploadFieldAdornment)
