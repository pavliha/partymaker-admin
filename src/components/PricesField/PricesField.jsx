import React, { Component } from 'react'
import { object, func, bool, string, arrayOf, shape, oneOfType, number } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { IconButton, FormControl, FormHelperText, TextField, Typography } from '@material-ui/core'
import AddCircleOutlineIcon from 'mdi-react/AddCircleOutlineIcon'
import { NumberField } from 'components'
import uniqId from 'uniqid'
import { actions, connect } from 'src/redux'
import PricesFieldRow from './PricesFieldRow'

const styles = {
  root: {
    width: '100%',
  },

  table: {
    width: '100%',
  },

  th: {
    textAlign: 'left',
    fontFamily: 'Google Sans,sans-serif',
    fontWeight: 400,
  },

  iconButton: {
    padding: 5,
  },

}

class PricesField extends Component {

  state = {
    title: '',
    cost: null,
  }

  handleTitle = e =>
    this.setState({ title: e.target.value })

  handleCost = (name, value) =>
    this.setState({ cost: value })

  add = () => {
    const { value: prices, onChange } = this.props
    const { title, cost } = this.state
    const price = { id: uniqId(), title, cost, }
    this.setState({ title: '', cost: '' })
    onChange([...prices, price])
  }

  remove = (price) => {
    const { value: prices, onChange, redux } = this.props
    redux.remove(price.id)
    onChange(prices.filter(p => p.id !== price.id))
  }

  change = price => {
    const { value, onChange } = this.props
    const prices = [...value]
    prices[prices.findIndex(p => p.id === price.id)] = price
    onChange(prices)
  }

  render() {
    const { classes, label, value: prices, error, helperText } = this.props
    const { title, cost } = this.state

    return (
      <FormControl data-testid="PricesField-root" fullWidth error={error} className={classes.root}>
        <Typography>{label}</Typography>
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>Услуга</th>
              <th className={classes.th}>Цена</th>
            </tr>
          </thead>
          <tbody>
            {prices.map(price =>
              <PricesFieldRow
                key={price.id}
                price={price}
                onChange={this.change}
                onDelete={this.remove}
              />
            )}
            <tr>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  data-testid="PricesField-add-title"
                  value={title}
                  placeholder="Название услуги"
                  onChange={this.handleTitle}
                />
              </td>
              <td width="100px">
                <NumberField
                  data-testid="PricesField-add-cost"
                  margin="normal"
                  value={cost}
                  suffix=" грн"
                  placeholder="100 грн"
                  onChange={this.handleCost}
                />
              </td>
              <td width="25px" align="right">
                <IconButton
                  data-testid="PricesField-add"
                  color="secondary"
                  className={classes.iconButton}
                  onClick={this.add}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </td>
            </tr>
          </tbody>
        </table>
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </FormControl>
    )
  }
}

PricesField.propTypes = {
  classes: object.isRequired,
  label: string,
  value: arrayOf(shape({
    id: oneOfType([number, string]),
    title: string,
    price: number,
  })),
  helperText: string,
  error: bool,
  onChange: func.isRequired,
  redux: object.isRequired,
}

const redux = () => ({
  remove: actions.places.prices.remove
})

export default withStyles(styles)(connect(redux)(PricesField))
