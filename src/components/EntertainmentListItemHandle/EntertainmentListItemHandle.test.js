import React from 'react'
import EntertainmentListItemHandle from './EntertainmentListItemHandle'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import theme from 'config/theme'

describe('<EntertainmentForm />', () => {

  it('should render properly', () => {
    const tree = mount(
      <ThemeProvider theme={createMuiTheme(theme)}>
        <EntertainmentListItemHandle>children</EntertainmentListItemHandle>
      </ThemeProvider>
    )
    expect(toJson(tree)).toMatchSnapshot()
  })

})
