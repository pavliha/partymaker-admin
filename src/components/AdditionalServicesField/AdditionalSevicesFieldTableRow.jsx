import React from 'react'
import { IconButton, Input } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { NumberField } from 'components'
import { number, object, oneOfType, shape, string, func } from 'prop-types'
import MinusCircleOutlineIcon from 'mdi-react/MinusCircleOutlineIcon'

const styles = theme => ({

  iconButton: {
    padding: 5,
  },

  titleInput: {
    fontFamily: 'Google Sans,sans-serif',
    fontWeight: 400,
    color: theme.palette.secondary.main,
    fontSize: 16,
  },

  descriptionInput: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)'
  }
})

const AdditionalServicesFieldTableRow = ({ classes, service, onChange, onDelete }) =>
  <tr data-testid="AdditionalServicesField-tr">
    <td>
      <Input
        className={classes.titleInput}
        fullWidth
        disableUnderline
        data-testid="AdditionalServicesField-title"
        value={service.title}
        placeholder="Назавание услуги"
        onChange={e => onChange({ ...service, title: e.target.value })}
      />
      <Input
        className={classes.descriptionInput}
        fullWidth
        disableUnderline
        value={service.description}
        data-testid="AdditionalServicesField-description"
        placeholder="Описание услуги"
        onChange={e => onChange({ ...service, description: e.target.value })}
      />
    </td>
    <td>
      <NumberField
        InputProps={{ disableUnderline: true }}
        margin="normal"
        value={service.price}
        suffix=" грн"
        data-testid="AdditionalServicesField-price"
        placeholder="100 грн"
        onChange={value => onChange({ ...service, price: value })}
      />
    </td>
    <td>
      <IconButton
        color="secondary"
        className={classes.iconButton}
        data-testid="AdditionalServicesField-remove"
        onClick={() => onDelete(service)}
      >
        <MinusCircleOutlineIcon />
      </IconButton>
    </td>
  </tr>

AdditionalServicesFieldTableRow.propTypes = {
  classes: object.isRequired,
  service: shape({
    id: oneOfType([string, number]).isRequired,
    title: string,
    description: string
  }),
  onChange: func.isRequired,
  onDelete: func.isRequired,
}
export default withStyles(styles)(AdditionalServicesFieldTableRow)
