import React from 'react'
import { object, func, bool, shape } from 'prop-types'
import placeShape from 'shapes/place'
import { Button, DialogActions, withStyles, TextField, Typography } from '@material-ui/core'
import { Form } from 'formik'
import {
  ServerMessage,
  Field,
  UploadField,
  EntertainmentsField,
  EditorField,
  NumberField,
  PhotosField,
  PricesField
} from 'components'
import * as Yup from 'yup'
import { EditorState } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'
import InputAdornment from '@material-ui/core/InputAdornment'

const styles = {

  root: {
    maxWidth: 500,
  },

  card: {
    borderRadius: 5,
    padding: 20,
    border: '1px rgba(0,0,0,0.1) solid',
    marginBottom: 20,
  },

  subtitle: {
    fontFamily: 'Google Sans, sans-serif',
    fontWeight: 500,
    marginLeft: 5,
    marginBottom: 5,
  },

  actions: {
    marginTop: 25,
  },

}

const PlaceForm = ({ classes, model, onCancel, formik: { isSubmitting }, }) => (
  <Form className={classes.root}>
    <Typography className={classes.subtitle}>Основная информация</Typography>
    <div className={classes.card}>
      <Field
        label="Название"
        name="title"
        placeholder={'Например: Пейнтбольный клуб "БЛОК-ПОСТ"'}
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
    <Typography className={classes.subtitle}>Требования к заказу</Typography>
    <div className={classes.card}>
      <Field
        label="Минимальная сумма заказа"
        name="min_order_amount"
        placeholder="100 грн"
        suffix=" грн"
        component={NumberField}
        InputProps={{ startAdornment: <InputAdornment position="start">от</InputAdornment> }}
      />
      <Field
        label="Минимальный возраст участников"
        name="age"
        placeholder="16 лет"
        suffix=" лет"
        margin="normal"
        component={NumberField}
        InputProps={{ startAdornment: <InputAdornment position="start">от</InputAdornment> }}
      />
      <Field
        label="Минимальное количество участников"
        name="players_min"
        type="number"
        placeholder="2 чел"
        suffix=" чел"
        margin="normal"
        InputProps={{ startAdornment: <InputAdornment position="start">от</InputAdornment> }}
        component={NumberField}
      />
      <Field
        label="Максимальное количество участников"
        name="players_max"
        type="number"
        margin="normal"
        suffix=" чел"
        placeholder="10 чел"
        InputProps={{ startAdornment: <InputAdornment position="start">до</InputAdornment> }}
        component={NumberField}
      />
      <ServerMessage name="message" />
      <ServerMessage color="error" name="non_field_errors" />
    </div>
    <div className={classes.card}>
      <Typography className={classes.subtitle}>Фотографии</Typography>
      <Field
        placeholder="Вставьте фото для загрузки"
        name="photos"
        component={PhotosField}
      />
    </div>
    <div className={classes.card}>
      <Field name="prices" component={PricesField} />
    </div>
    <div className={classes.card}>
      <Field
        name="description"
        placeholder="Please type description here .."
        margin="normal"
        component={EditorField}
      />
    </div>
    <DialogActions className={classes.actions}>
      <Button
        onClick={onCancel}
        disabled={isSubmitting}
        color="secondary"
      >
        Отменить
      </Button>
      <Button
        disabled={isSubmitting}
        type="submit"
        variant="outlined"
        color="primary"
      >
        {model ? 'Сохранить' : 'Создать'}
      </Button>
    </DialogActions>
  </Form>
)

PlaceForm.propTypes = {
  classes: object.isRequired,
  onCancel: func.isRequired,
  model: placeShape,
  formik: shape({
    isSubmitting: bool.isRequired,
  }),
}

PlaceForm.validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  picture_url: Yup.string(),
  price: Yup.string(),
  age: Yup.string().nullable(),
  players_min: Yup.number().nullable(),
  players_max: Yup.number().nullable(),
  working_hours: Yup.string(),
  entertainment_id: Yup.number().required().nullable(),
  description: Yup.object()
})

PlaceForm.mapPropsToValues = ({ model }) => ({
  title: model?.title || '',
  picture_url: model?.picture_url || '',
  price: model?.price || '',
  age: model?.age || '',
  players_min: model?.players_min || '',
  players_max: model?.players_max || '',
  working_hours: model?.working_hours || '',
  entertainment_id: model?.entertainment_id || null,
  prices: model?.prices || [],
  description: model?.description
    ? EditorState.createWithContent(stateFromHTML(model?.description))
    : EditorState.createEmpty()
})

export default withStyles(styles)(PlaceForm)
