import React, { Component } from 'react'
import { object, func, bool, string, arrayOf, oneOfType, number, shape } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import { IconButton, FormHelperText, Input, Typography } from '@material-ui/core'
import AddCircleOutlineIcon from 'mdi-react/AddCircleOutlineIcon'
import { NumberField } from 'components'
import uniqId from 'uniqid'
import { actions, connect } from 'src/redux'
import AdditionalServicesFieldTableRow from './AdditionalSevicesFieldTableRow'

const styles = theme => ({
  root: {
    width: '100%',
  },

  table: {
    borderCollapse: 'collapse',
    width: '100%',

    '& th': {
      textAlign: 'left',
      fontFamily: 'Google Sans,sans-serif',
      fontWeight: 400,
      paddingBottom: 15,
    },
    '& td': {
      borderTop: '1px rgba(0,0,0,0.1) solid',
      borderBottom: '1px rgba(0,0,0,0.1) solid',

    }
  },

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

export class AdditionalServicesField extends Component {

  state = {
    additional_service: {
      title: '',
      price: null,
      description: '',
    }
  }

  update = (values) =>
    this.setState(s => ({ ...s, values }))

  add = () => {
    const { value: services, onChange } = this.props
    const { title, price, description } = this.state
    const service = { id: uniqId(), title, price, description }
    onChange([...services, service])
    const additional_service = { title: '', price: '', description: '' }
    this.setState({ additional_service })
  }

  remove = service => {
    const { value: services, onChange, redux } = this.props
    redux.remove(service.id)
    onChange(services.filter(p => p.id !== service.id))
  }

  change = service => {
    const { value, onChange } = this.props
    const services = [...value]
    services[services.findIndex(p => p.id === service.id)] = service
    onChange(services)
  }

  render() {
    const { classes, label, value: services, error, helperText } = this.props
    const { title, price, description } = this.state

    return (
      <div className={classes.root} data-testid="AdditionalServicesField-root">
        <Typography>{label}</Typography>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Услуга</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <AdditionalServicesFieldTableRow
                key={service.id}
                service={service}
                onChange={this.change}
                onDelete={this.remove}
              />
            ))}
            <tr>
              <td>
                <Input
                  fullWidth
                  className={classes.titleInput}
                  value={title}
                  disableUnderline
                  placeholder="Назавание услуги"
                  onChange={e => this.update({ title: e.target.value })}
                  data-testid="AdditionalServicesField-add-title"
                />
                <Input
                  className={classes.descriptionInput}
                  fullWidth
                  value={description}
                  disableUnderline
                  placeholder="Описание услуги"
                  onChange={e => this.update({ description: e.target.value })}
                  data-testid="AdditionalServicesField-add-description"
                />
              </td>
              <td width="100px">
                <NumberField
                  value={price}
                  suffix=" грн"
                  InputProps={{ disableUnderline: true }}
                  placeholder="100 грн"
                  onChange={value => this.update({ price: value })}
                  data-testid="AdditionalServicesField-add-price"
                />
              </td>
              <td width="25px">
                <IconButton
                  color="secondary"
                  className={classes.iconButton}
                  onClick={this.add}
                  data-testid="AdditionalServicesField-add"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </td>
            </tr>
          </tbody>
        </table>
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </div>
    )
  }
}

AdditionalServicesField.propTypes = {
  classes: object.isRequired,
  value: arrayOf(shape({
    id: oneOfType([number, string]).isRequired,
    title: string.isRequired,
    description: string,
    price: number,
    created_at: string,
    updated_at: string,
  })),
  label: string,
  helperText: string,
  error: bool,
  onChange: func.isRequired,
  redux: object,
}

const redux = () => ({
  remove: actions.places.additional_services.remove
})
export default withStyles(styles)(connect(redux)(AdditionalServicesField))
