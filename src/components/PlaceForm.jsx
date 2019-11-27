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
    <Typography className={classes.subtitle}>Контакты</Typography>
    <div className={classes.card}>
      <Field
        label="Номер телефона"
        name="phone"
        placeholder="+380683188515"
        margin="dense"
        component={TextField}
      />
      <Field
        label="Веб-сайт"
        name="website_url"
        placeholder="http://example.com"
        margin="dense"
        component={TextField}
      />
      <Field
        label="Карта"
        name="map_url"
        placeholder="map url"
        margin="dense"
        component={TextField}
      />
      <Field
        label="Адрес"
        name="address"
        placeholder="Address"
        margin="dense"
        component={TextField}
      />
      <Field
        label="Как добраться"
        name="directions"
        placeholder="Directions"
        margin="dense"
        component={TextField}
      />
      <Field
        label="Email"
        type="email"
        name="email"
        placeholder="Email"
        margin="dense"
        component={TextField}
      />
      <Field
        label="Инстаграм"
        type="url"
        name="instagram_url"
        placeholder="Instagram url"
        margin="dense"
        component={TextField}
      />
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
  // General
  title: Yup.string().required(),
  picture_url: Yup.string(),
  price: Yup.string(),
  working_hours: Yup.string(),
  entertainment_id: Yup.number().required().nullable(),
  // Requirements
  min_order_amount: Yup.string().nullable(),
  age_min: Yup.number().nullable(),
  age_max: Yup.number().nullable(),
  players_min: Yup.number().nullable(),
  players_max: Yup.number().nullable(),
  // Photos
  photos: Yup.array(),
  // Prices
  prices: Yup.array(),
  about_prices: Yup.string(),
  // Services
  additional_services: Yup.array(),
  // Contacts
  phone: Yup.string().required(),
  website_url: Yup.string(),
  map_url: Yup.string(),
  address: Yup.string(),
  directions: Yup.string(),
  email: Yup.string().email(),
  instagram_url: Yup.string(),
  // Description
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
  // Contacts
  phone: model?.contacts?.phone || '',
  website_url: model?.contacts?.website_url || '',
  map_url: model?.contacts?.map_url || '',
  address: model?.contacts?.address || '',
  directions: model?.contacts?.directions || '',
  email: model?.contacts?.email || '',
  instagram_url: model?.contacts?.instagram_url || '',
  // Description
  description: model?.description
    ? EditorState.createWithContent(stateFromHTML(model?.description))
    : EditorState.createEmpty()
})

export default withStyles(styles)(PlaceForm)
