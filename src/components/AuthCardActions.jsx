import React from 'react'
import { connect } from 'formik'
import { string, object, bool, shape } from 'prop-types'
import { Button, withStyles } from '@material-ui/core'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px',
    marginBottom: 20,
  },
  button: {
    minWidth: 130,
    marginRight: 40,
  }
}

const AuthCardActions = ({ formik, classes, textButton }) =>
  <div className={classes.root}>
    <Button
      disabled={formik.isSubmitting}
      className={classes.button}
      type="submit"
      size="large"
      variant="outlined"
      color="primary"
    >
      {formik.isSubmitting ? 'Загрузка...' : textButton}
    </Button>
  </div>

AuthCardActions.propTypes = {
  classes: object.isRequired,
  textButton: string.isRequired,
  formik: shape({
    isSubmitting: bool.isRequired
  }),
}

export default withStyles(styles)(connect(AuthCardActions))
