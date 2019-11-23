import React, { Component } from 'react'
import { object, func, bool, string, arrayOf } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import priceShape from 'shapes/price'
import { IconButton, FormControl, FormHelperText, TextField } from '@material-ui/core'
import MinusCircleOutlineIcon from 'mdi-react/MinusCircleOutlineIcon'
import AddCircleOutlineIcon from 'mdi-react/AddCircleOutlineIcon'
import { NumberField } from 'components'
import uniqId from 'uniqid'

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

  handleTitle = e => {
    this.setState({ title: e.target.value })
  }

  handleCost = (name, value) => {
    this.setState({ cost: value })
  }

  changeTitle = index => e => {
    const { name, value: prices, onChange } = this.props
    prices[index] = { ...prices[index], title: e.target.value }
    onChange(name, [...prices])
  }

  changeCost = index => (field, value) => {
    const { name, value: prices, onChange } = this.props
    prices[index] = { ...prices[index], price: value }
    onChange(name, [...prices])
  }

  add = () => {
    const { name, value: prices, onChange } = this.props
    const { title, cost } = this.state
    const price = { id: uniqId(), title, cost, }
    this.setState({ title: '', cost: '' })
    onChange(name, [...prices, price])
  }

  remove = (index) => () => {
    const { name, value: prices, onChange } = this.props
    prices.splice(index, 1)
    onChange(name, [...prices])
  }

  render() {
    const { classes, value: prices, error, helperText } = this.props
    const { title, cost } = this.state

    return (
      <FormControl fullWidth error={error} className={classes.root}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>Услуга</th>
              <th className={classes.th}>Цена</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price, index) => (
              <tr key={price.id}>
                <td>
                  <TextField
                    margin="normal"
                    fullWidth
                    value={price.title}
                    placeholder="Назавание услуги"
                    onChange={this.changeTitle(index)}
                  />
                </td>
                <td>
                  <NumberField
                    margin="normal"
                    value={price.cost}
                    suffix=" грн"
                    placeholder="100 грн"
                    onChange={this.changeCost(index)}
                  />
                </td>
                <td>
                  <IconButton
                    color="secondary"
                    className={classes.iconButton}
                    onClick={this.remove(index)}
                  >
                    <MinusCircleOutlineIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  value={title}
                  placeholder="Назавание услуги"
                  onChange={this.handleTitle}
                />
              </td>
              <td width="100px">
                <NumberField
                  margin="normal"
                  value={cost}
                  suffix=" грн"
                  placeholder="100 грн"
                  onChange={this.handleCost}
                />
              </td>
              <td width="25px" align="right">
                <IconButton
                  color="secondary"
                  className={classes.iconButton}
                  disabled={!title}
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
  name: string,
  value: arrayOf(priceShape),
  helperText: string,
  error: bool,
  onChange: func.isRequired,
}

export default withStyles(styles)(PricesField)
