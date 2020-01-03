import React from 'react'
import { object, string } from 'prop-types'
import { Field } from 'components'
import { TextField, withStyles } from '@material-ui/core'
import classNames from 'classnames'

const styles = {
  root: {},
}

const ContactsFormGroup = ({ classes, className }) =>
  <div className={classNames(classes.root, className)}>
    <Field
      label="Номер телефона"
      name="contacts.phone"
      placeholder="+380683188515"
      margin="dense"
      component={TextField}
    />
    <Field
      label="Веб-сайт"
      name="contacts.website_url"
      placeholder="http://example.com"
      margin="dense"
      component={TextField}
    />
    <Field
      label="Карта"
      name="contacts.map_url"
      placeholder="map url"
      margin="dense"
      component={TextField}
    />
    <Field
      label="Адрес"
      name="contacts.address"
      placeholder="Address"
      margin="dense"
      component={TextField}
    />
    <Field
      label="Как добраться"
      name="contacts.directions"
      placeholder="Directions"
      margin="dense"
      component={TextField}
    />
    <Field
      label="Email"
      type="email"
      name="contacts.email"
      placeholder="Email"
      margin="dense"
      component={TextField}
    />
    <Field
      label="Инстаграм"
      type="url"
      name="contacts.instagram_url"
      placeholder="Instagram url"
      margin="dense"
      component={TextField}
    />
  </div>

ContactsFormGroup.propTypes = {
  classes: object.isRequired,
  className: string,
}

export default withStyles(styles)(ContactsFormGroup)
