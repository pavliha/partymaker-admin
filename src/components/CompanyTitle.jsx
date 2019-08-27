import React from 'react'
import { object, func } from 'prop-types'
import { IconButton, withStyles } from '@material-ui/core'
import companyShape from 'src/shapes/company'
import BackIcon from 'mdi-react/ArrowLeftIcon'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
  },
}

const CompanyTitle = ({ classes, company, onBack }) =>
  <div className={classes.root}>
    <div>
      <IconButton onClick={onBack}>
        <BackIcon />
      </IconButton>
    </div>
    <div className={classes.text}>
      {company.title} - id {company.id}
    </div>
  </div>

CompanyTitle.propTypes = {
  classes: object.isRequired,
  company: companyShape,
  onBack: func.isRequired,
}

export default withStyles(styles)(CompanyTitle)
