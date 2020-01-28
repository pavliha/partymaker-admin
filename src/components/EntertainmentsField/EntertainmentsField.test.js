import React from 'react'
import { EntertainmentsField } from './EntertainmentsField'
import DropdownField from 'components/DropdownField'

describe('<EntertainmentsField />', () => {

  const testProps = {
    name: 'entertainment_id',
    value: 1,
    onChange: () => {},
    error: true,
    label: 'Label',
    helperText: 'Dummy helper text',
    redux: {
      entertainments: [
        { id: 1, title: 'Entertainment 1' },
        { id: 2, title: 'Entertainment 2' }
      ]
    }
  }

  it('should pass entertainments to DropdownField', () => {
    const field = shallow(<EntertainmentsField {...testProps} />)
    expect(field.find(DropdownField).props().items).toStrictEqual([
      { 'label': 'Entertainment 1', 'value': 1 },
      { 'label': 'Entertainment 2', 'value': 2 }]
    )
  })
})
