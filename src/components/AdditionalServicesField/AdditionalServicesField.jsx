import React, { Component } from 'react'
import { object, func, bool, string, arrayOf, shape } from 'prop-types'
import { withStyles } from '@material-ui/styles'
import serviceShape from 'shapes/service'
import { IconButton, FormHelperText, Input } from '@material-ui/core'
import MinusCircleOutlineIcon from 'mdi-react/MinusCircleOutlineIcon'
import AddCircleOutlineIcon from 'mdi-react/AddCircleOutlineIcon'
import { NumberField } from 'components'
import uniqId from 'uniqid'
import { actions, connect } from 'src/redux'

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

class AdditionalServicesField extends Component {

  state = {
    title: '',
    price: null,
    description: '',
  }

  handleTitle = e => {
    this.setState({ title: e.target.value })
  }

  handleDescription = e => {
    this.setState({ description: e.target.value })
  }

  handlePrice = (name, value) => {
    this.setState({ price: value })
  }

  changeTitle = index => e => {
    const { name, value: services, onChange } = this.props
    services[index] = { ...services[index], title: e.target.value }
    onChange(name, [...services])
  }

  changeDescription = index => e => {
    const { name, value: services, onChange } = this.props
    services[index] = { ...services[index], description: e.target.value }
    onChange(name, [...services])
  }

  changePrice = index => (field, value) => {
    const { name, value: services, onChange } = this.props
    services[index] = { ...services[index], price: value }
    onChange(name, [...services])
  }

  add = () => {
    const { name, value: services, onChange } = this.props
    const { title, price, description } = this.state
    const service = { id: uniqId(), title, price, description }
    onChange(name, [...services, service])
    this.setState({ title: '', price: '', description: '' })
  }

  remove = (index) => () => {
    const { name, value: services, onChange, redux } = this.props
    redux.remove(services[index].id)
    services.splice(index, 1)
    onChange(name, [...services])
  }

  render() {
    const { classes, value: services, error, helperText } = this.props
    const { title, price, description } = this.state

    return (
      <div className={classes.root}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Услуга</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id}>
                <td>
                  <Input
                    className={classes.titleInput}
                    fullWidth
                    disableUnderline
                    value={service.title}
                    placeholder="Назавание услуги"
                    onChange={this.changeTitle(index)}
                  />
                  <Input
                    className={classes.descriptionInput}
                    fullWidth
                    disableUnderline
                    value={service.description}
                    placeholder="Описание услуги"
                    onChange={this.changeDescription(index)}
                  />
                </td>
                <td>
                  <NumberField
                    InputProps={{ disableUnderline: true }}
                    margin="normal"
                    value={service.price}
                    suffix=" грн"
                    placeholder="100 грн"
                    onChange={this.changePrice(index)}
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
                <Input
                  fullWidth
                  className={classes.titleInput}
                  value={title}
                  disableUnderline
                  placeholder="Назавание услуги"
                  onChange={this.handleTitle}
                />
                <Input
                  className={classes.descriptionInput}
                  fullWidth
                  value={description}
                  disableUnderline
                  placeholder="Описание услуги"
                  onChange={this.handleDescription}
                />
              </td>
              <td width="100px">
                <NumberField
                  value={price}
                  suffix=" грн"
                  InputProps={{ disableUnderline: true }}
                  placeholder="100 грн"
                  onChange={this.handlePrice}
                />
              </td>
              <td width="25px">
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
      </div>
    )
  }
}

AdditionalServicesField.propTypes = {
  classes: object.isRequired,
  name: string,
  value: arrayOf(shape(serviceShape)),
  helperText: string,
  error: bool,
  onChange: func.isRequired,
  redux: object,
}

const redux = () => ({
  remove: actions.places.additional_services.remove
})
export default withStyles(styles)(connect(redux)(AdditionalServicesField))
