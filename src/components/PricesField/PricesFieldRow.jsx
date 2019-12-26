import React from 'react'
import { object, func, string, shape, number, oneOfType } from 'prop-types'
import { IconButton, TextField, withStyles } from '@material-ui/core'
import { NumberField } from 'components'
import MinusCircleOutlineIcon from 'mdi-react/MinusCircleOutlineIcon'

const styles = {
  iconButton: {
    padding: 5,
  },
}

class PricesFieldRow extends React.Component {

  changeTitle = e => {
    const { price, onChange } = this.props
    onChange({ ...price, title: e.target.value })
  }

  changeCost = (name, value) => {
    const { price, onChange } = this.props
    console.log('called', name, value)
    onChange({ ...price, cost: value })
  }

  render() {
    const { classes, price, onDelete } = this.props

    return (
      <tr data-testid="PricesField-tr">
        <td>
          <TextField
            margin="normal"
            fullWidth
            data-testid="PricesField-title"
            value={price.title}
            placeholder="Назавание услуги"
            onChange={this.changeTitle}
          />
        </td>
        <td>
          <NumberField
            data-testid="PricesField-cost"
            margin="normal"
            value={price.cost}
            suffix=" грн"
            placeholder="100 грн"
            onChange={this.changeCost}
          />
        </td>
        <td>
          <IconButton
            data-testid="PricesField-remove"
            color="secondary"
            className={classes.iconButton}
            onClick={() => onDelete(price)}
          >
            <MinusCircleOutlineIcon />
          </IconButton>
        </td>
      </tr>
    )
  }
}

PricesFieldRow.propTypes = {
  classes: object.isRequired,
  price: shape({
    id: oneOfType([string, number]).isRequired,
    title: string,
    price: number
  }),
  onChange: func.isRequired,
  onDelete: func.isRequired,
}

export default withStyles(styles)(PricesFieldRow)
