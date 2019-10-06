import React, { Component } from 'react'
import { func, object, shape } from 'prop-types'
import { Typography, withStyles } from '@material-ui/core'
import { UploadField } from 'components'

const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
  },

  title: {
    marginRight: 10,
  }
}

class PhotoForm extends Component {

  submit = (name, value) => {
    const { submitForm, setFieldValue } = this.props.formik
    setFieldValue(name, value)
    setTimeout(submitForm)
  }

  render() {
    const { classes, formik: { errors, values } } = this.props
    return (
      <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>Photos</Typography>
        <UploadField
          name="url"
          fullWidth
          helperText={errors.url}
          error={!!errors.url}
          value={values.url}
          onChange={this.submit}
        />
      </div>
    )
  }
}

PhotoForm.propTypes = {
  classes: object.isRequired,
  formik: shape({
    handleSubmit: func,
  })
}

PhotoForm.mapPropsToValues = () => ({
  url: '',
})

export default withStyles(styles)(PhotoForm)
