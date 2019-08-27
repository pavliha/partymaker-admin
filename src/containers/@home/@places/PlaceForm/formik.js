import { withFormik } from 'formik'
import to from 'util-to'
import * as Yup from 'yup'
import transformValidationErrors from 'src/utils/transformValidationApi'

const formik = withFormik({
  validationSchema: Yup.object().shape({
    title: Yup.string().required(),
    picture_url: Yup.string().required(),
    price: Yup.string().required(),
    phone: Yup.string().required(),
    map_url: Yup.string().required(),
    website_url: Yup.string().required(),
    working_hours: Yup.string().required(),
  }),

  enableReinitialize: true,

  mapPropsToValues: ({ model }) => ({
    title: model?.title || '',
    picture_url: model?.picture_url,
    price: model?.price,
    phone: model?.phone,
    map_url: model?.map_url,
    website_url: model?.website_url,
    working_hours: model?.working_hours
  }),

  handleSubmit: async (form, { props, setSubmitting, setErrors }) => {
    const [err] = await to(props.onSubmit({ form, id: props.model?.id }))
    if (err) {
      console.error(err)
      if (err.message === 'Network Error') {
        setErrors({ non_field_errors: 'Something wrong with server response' })
      } else {
        setErrors(transformValidationErrors(err))
      }
    }
    setSubmitting(false)
  },
  displayName: 'PlacesForm',
})

export default formik
