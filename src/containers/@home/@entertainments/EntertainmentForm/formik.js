import { withFormik } from 'formik'
import to from 'util-to'
import * as Yup from 'yup'
import transformValidationErrors from 'src/utils/transformValidationApi'

const formik = withFormik({
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Please enter name'),
  }),

  enableReinitialize: true,

  mapPropsToValues: ({ model }) => ({
    title: model?.title || '',
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
  displayName: 'EntertainmentsForm',
})

export default formik
