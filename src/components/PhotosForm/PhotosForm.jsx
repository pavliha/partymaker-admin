import React, { Component } from 'react'
import { func, object, shape } from 'prop-types'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { UploadField } from 'components'

const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 20,
  },

  title: {
    width: 150,
  },

  field: {
    flex: 1,
  }
}

class PhotosForm extends Component {

  submit = (value) => {
    const { submitForm, setFieldValue } = this.props.formik
    setFieldValue('url', value)
    setTimeout(submitForm)
    setTimeout(() => setFieldValue('url', ''), 200)
  }

  render() {
    const { classes, formik: { errors, values, setFieldError } } = this.props
    return (
      <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>Photos</Typography>
        <UploadField
          type="slide"
          placeholder="paste url to upload"
          className={classes.field}
          name="url"
          fullWidth
          helperText={errors.url}
          error={!!errors.url}
          value={values.url}
          onError={error => setFieldError(name, error)}
          onChange={this.submit}
        />
      </div>
    )
  }
}

PhotosForm.propTypes = {
  classes: object.isRequired,
  formik: shape({
    handleSubmit: func,
  })
}

PhotosForm.mapPropsToValues = () => ({
  url: '',
})

export default withStyles(styles)(PhotosForm)
