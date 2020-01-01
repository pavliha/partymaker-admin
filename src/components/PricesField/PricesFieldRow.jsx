import React from 'react'
import { func, number, object, oneOfType, shape, string } from 'prop-types'
import { IconButton, TextField, withStyles } from '@material-ui/core'
import { NumberField } from 'components'
import MinusCircleOutlineIcon from 'mdi-react/MinusCircleOutlineIcon'

const styles = {
  iconButton: {
    padding: 5,
  },
}

const PricesFieldRow = ({ classes, price, onChange, onDelete }) =>
  <tr data-testid="PricesField-tr">
    <td>
      <TextField
        margin="normal"
        fullWidth
        data-testid="PricesField-title"
        value={price.title}
        placeholder="Назавание услуги"
        onChange={e => onChange({ ...price, title: e.target.value })}
      />
    </td>
    <td>
      <NumberField
        data-testid="PricesField-cost"
        margin="normal"
        value={price.cost}
        suffix=" грн"
        placeholder="100 грн"
        onChange={value => onChange({ ...price, cost: value })}
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
