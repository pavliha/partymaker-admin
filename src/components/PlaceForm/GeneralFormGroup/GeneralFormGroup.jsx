import React from 'react'
import { func, object, shape, string } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { EntertainmentsField, Field, UploadField } from 'components'
import { TextField } from '@material-ui/core'
import classNames from 'classnames'

const styles = {
  root: {},
}

const GeneralFormGroup = ({ classes, className, photosAPI }) =>
  <div className={classNames(classes.card, className)}>
    <Field
      label="Название"
      name="title"
      placeholder='Например: Пейнтбольный клуб "БЛОК-ПОСТ"'
      margin="normal"
      component={TextField}
    />
    <Field
      label="Логотип"
      name="picture_url"
      placeholder="http://example.com/picture.jpeg"
      margin="normal"
      type="thumbnail"
      component={UploadField}
      api={photosAPI}
    />
    <Field
      label="Цена"
      name="price"
      placeholder="300 грн / чел"
      margin="normal"
      component={TextField}
    />
    <Field
      label="Время работы"
      name="working_hours"
      placeholder="ПН-ПТ 10:00-19:30"
      margin="normal"
      component={TextField}
    />
    <div style={{ height: 10 }} />
    <Field
      label="Тип развлечения"
      name="entertainment_id"
      placeholder="Пейнтбол"
      margin="normal"
      component={EntertainmentsField}
    />
  </div>

GeneralFormGroup.propTypes = {
  classes: object.isRequired,
  className: string,
  photosAPI: shape({
    uploadFile: func.isRequired,
    uploadUrl: func.isRequired,
    destroy: func.isRequired,
  })
}

export default withStyles(styles)(GeneralFormGroup)
