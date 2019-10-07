/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import { bool, func, node, object, string } from 'prop-types'
import { Dialog, DialogContent, DialogTitle, IconButton, withStyles } from '@material-ui/core'
import CloseIcon from 'mdi-react/CloseIcon'

const styles = {
  root: {},
  paperWidthSm: {
    minWidth: 850,
    borderRadius: 10,
  },
  paperScrollPaper: {
    maxHeight: 'calc(100% - 50px)',
  },
  container: {
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    padding: '0 5px',
  },
  paper: {
    margin: 24,
    padding: 15,
    overflow: 'visible',
  },
  title: {
    '& h6': {
      fontFamily: 'Google Sans ,Roboto,Arial,sans-serif',
    },
    padding: 0,
  },
  overflow: {
    overflow: 'auto',
    padding: '0px 10px 5px',
  },
}

const FormDialog = ({ title, children, classes, onClose, isOpen }) => {

  if (!isOpen) return null

  return (
    <Dialog
      open={isOpen}
      classes={{
        root: classes.root,
        paperScrollPaper: classes.paperScrollPaper,
        paperWidthSm: classes.paperWidthSm,
        paper: classes.paper,
      }}
      onClose={onClose}
      aria-labelledby="delete-company-dialog"
      aria-describedby="delete-company-dialog-description"
    >
      <div className={classes.container}>
        <DialogTitle className={classes.title} id="alert-dialog-title">
          {title}
        </DialogTitle>
        <div className={classes.icon}>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </div>
      </div>
      <DialogContent className={classes.overflow}>
        {children}
      </DialogContent>
    </Dialog>
  )
}

FormDialog.propTypes = {
  classes: object.isRequired,
  title: string,
  isOpen: bool.isRequired,
  children: node.isRequired,
  onClose: func.isRequired,
}

export default withStyles(styles)(FormDialog)
