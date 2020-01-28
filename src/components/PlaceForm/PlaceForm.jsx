import React from 'react'
import { object, func, bool, shape } from 'prop-types'
import * as Yup from 'yup'
import { EditorState } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'
import { Button, DialogActions, TextField, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Form } from 'formik'
import api from 'api'
import { Field, EditorField, PhotosField, PricesField, AdditionalServicesField } from 'components'
import GeneralFormGroup from './GeneralFormGroup'
import RequirementsFormGroup from './RequirementsFormGroup'
import ContactsFormGroup from './ContactsFormGroup'

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

const photosAPI = {
  uploadUrl: api.uploads.picture.url.create,
  uploadFile: api.uploads.picture.file.create,
  destroy: api.uploads.destroy,
}

const PlaceForm = ({ classes, model, onCancel, formik: { isSubmitting } }) =>
  <Form className={classes.root}>
    <Typography className={classes.subtitle}>Основная информация</Typography>
    <GeneralFormGroup
      className={classes.card}
      photosAPI={photosAPI}
    />
    <Typography className={classes.subtitle}>Требования к заказу</Typography>
    <RequirementsFormGroup
      className={classes.card}
      photosAPI={photosAPI}
    />
    <Typography className={classes.subtitle}>Фотографии</Typography>
    <div className={classes.card}>
      <Field
        placeholder="Вставьте фото для загрузки"
        name="photos"
        component={PhotosField}
        api={photosAPI}
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
    <ContactsFormGroup className={classes.card} />
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
  model: object,
  formik: shape({
    isSubmitting: bool.isRequired,
  }),
}

PlaceForm.validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  picture_url: Yup.string(),
  price: Yup.string(),
  working_hours: Yup.string(),
  entertainment_id: Yup.number().required().nullable(),
  requirements: Yup.object({
    min_order_amount: Yup.string().nullable(),
    age_min: Yup.number().nullable(),
    age_max: Yup.number().nullable(),
    players_min: Yup.number().nullable(),
    players_max: Yup.number().nullable(),
  }),
  photos: Yup.array(),
  prices: Yup.array(),
  about_prices: Yup.string(),
  additional_services: Yup.array(),
  contacts: Yup.object({
    phone: Yup.string(),
    website_url: Yup.string(),
    map_url: Yup.string(),
    address: Yup.string(),
    directions: Yup.string(),
    email: Yup.string().email(),
    instagram_url: Yup.string()
  }),
  description: Yup.object()
})

PlaceForm.mapPropsToValues = ({ model }) => ({
  title: model?.title || '',
  picture_url: model?.picture_url || '',
  price: model?.price || '',
  working_hours: model?.working_hours || '',
  entertainment_id: model?.entertainment_id || null,
  photos: model?.photos || [],
  prices: model?.prices || [],
  about_prices: model?.about_prices || '',
  additional_services: model?.additional_services || [],
  description: model?.description
    ? EditorState.createWithContent(stateFromHTML(model?.description))
    : EditorState.createEmpty(),
  requirements: {
    min_order_amount: model?.requirements?.min_order_amount || null,
    age_min: model?.requirements?.age_min || null,
    age_max: model?.requirements?.age_max || null,
    players_min: model?.requirements?.players_min || null,
    players_max: model?.requirements?.players_max || null,
  },
  contacts: {
    phone: model?.contacts?.phone || '',
    website_url: model?.contacts?.website_url || '',
    map_url: model?.contacts?.map_url || '',
    address: model?.contacts?.address || '',
    directions: model?.contacts?.directions || '',
    email: model?.contacts?.email || '',
    instagram_url: model?.contacts?.instagram_url || '',
  },
})

export default withStyles(styles)(PlaceForm)
