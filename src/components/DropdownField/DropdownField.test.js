import React from 'react'
import DropdownField from './DropdownField'

describe('DropdownField', () => {

  it('it renders dropdown field', () => {

    const items = [
      { label: 'Dropdown item 1', value: 1, },
      { label: 'Dropdown item 2', value: 'some' },
      { label: '', value: 'next' }
    ]
    const tree = mount(
      <DropdownField
        name="dropdown"
        value={1}
        onChange={() => {}}
        items={items}
        helperText="Helper text"
        error
        label="Dropdown label"
      />
    )

    expect(toJson(tree)).toMatchSnapshot()
  })

})
