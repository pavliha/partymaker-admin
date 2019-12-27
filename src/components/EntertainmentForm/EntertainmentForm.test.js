import React from 'react'
import EntertainmentForm from './EntertainmentForm'

describe('<EntertainmentForm />', () => {

  const testProps = {
    model: { id: 1, title: 'test-data' },
    formik: { isSubmitting: false },
    onCancel: () => {}
  }

  it('should render properly', () => {
    const tree = shallow(<EntertainmentForm {...testProps} />).dive()
    expect(toJson(tree)).toMatchSnapshot()
  })

})
