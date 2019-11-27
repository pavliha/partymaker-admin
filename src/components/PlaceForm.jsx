import React from 'react'
import { object, func, bool, shape } from 'prop-types'
import placeShape from 'shapes/place'
import * as Yup from 'yup'
import { EditorState } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'
import { Button, DialogActions, withStyles, TextField, Typography, InputAdornment } from '@material-ui/core'
import { Form } from 'formik'
import {
  ServerMessage,
  Field,
  EntertainmentsField,
  UploadField,
  EditorField,
  NumberField,
  PhotosField,
  PricesField,
  AdditionalServicesField,
} from 'components'

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

  aboutPriceField: {
    marginBottom: 20,
    '& fieldset': {
      border: '1px rgba(0,0,0,0.1) solid',
      borderRadius: 5,
    }
  },

  actions: {
    marginTop: 25,
  },

}

const PlaceForm = ({ classes, model, onCancel, formik: { isSubmitting } }) =>
  <Form className={classes.root}>
    <Typography className={classes.subtitle}>Основная информация</Typography>
    <div className={classes.card}>
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
        name="age_min"
        placeholder="10 лет"
        suffix=" лет"
        margin="normal"
        component={NumberField}
        InputProps={{ startAdornment: <InputAdornment position="start">от</InputAdornment> }}
      />
      <Field
        label="Максимальный возраст участников"
        name="age_max"
        placeholder="14 лет"
        suffix=" лет"
        margin="normal"
        component={NumberField}
        InputProps={{ startAdornment: <InputAdornment position="start">от</InputAdornment> }}
      />
      <Field
        label="Минимальное количество участников"
        name="players_min"
        placeholder="2 чел"
        suffix=" чел"
        margin="normal"
        InputProps={{ startAdornment: <InputAdornment position="start">от</InputAdornment> }}
        component={NumberField}
      />
      <Field
        label="Максимальное количество участников"
        name="players_max"
        margin="normal"
        suffix=" чел"
        placeholder="10 чел"
        InputProps={{ startAdornment: <InputAdornment position="start">до</InputAdornment> }}
        component={NumberField}
      />
      <ServerMessage name="message" />
      <ServerMessage color="error" name="non_field_errors" />
    </div>
    <Typography className={classes.subtitle}>Фотографии</Typography>
    <div className={classes.card}>
      <Field
        placeholder="Вставьте фото для загрузки"
        name="photos"
        component={PhotosField}
      />
    </div>
    <Typography className={classes.subtitle}>Цены</Typography>
    <div className={classes.card}>
      <Field name="prices" component={PricesField} />
    </div>
    <Field
      className={classes.aboutPriceField}
      name="about_prices"
      rows={2}
      label="Подробнее о ценах"
      variant="outlined"
      multiline
      component={TextField}
    />
    <Typography className={classes.subtitle}>Дополнительные услуги</Typography>
    <div className={classes.card}>
      <Field name="additional_services" component={AdditionalServicesField} />
    </div>
    <Typography className={classes.subtitle}>Описание</Typography>
    <Field
      name="description"
      placeholder="Please type description here .."
      margin="normal"
      component={EditorField}
    />
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
  // General
  title: model?.title || '',
  picture_url: model?.picture_url || '',
  price: model?.price || '',
  working_hours: model?.working_hours || '',
  entertainment_id: model?.entertainment_id || null,
  // Requirements
  min_order_amount: model?.requirements?.min_order_amount || null,
  age_min: model?.requirements?.age_min || null,
  age_max: model?.requirements?.age_max || null,
  players_min: model?.requirements?.players_min || null,
  players_max: model?.requirements?.players_max || null,
  // Photos
  photos: model?.photos || [],
  // Prices
  prices: model?.prices || [],
  about_prices: model?.about_prices || '',
  // Additional Services
  additional_services: model?.additional_services || [],
  // Description
  description: model?.description
    ? EditorState.createWithContent(stateFromHTML(model?.description))
    : EditorState.createEmpty()
})

export default withStyles(styles)(PlaceForm)
