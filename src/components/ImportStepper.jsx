import React from 'react'
import { number, object } from 'prop-types'
import { Stepper, withStyles, StepButton, Step } from '@material-ui/core'

const styles = () => ({
  root: {},
})

class ImportStepper extends React.Component {
  nextStep = (step) => () => {
    this.setState({ step })
  }

  render() {
    const { classes, activeStep } = this.props

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep}>
          <Step>
            <StepButton onClick={this.nextStep(0)} completed={false}>
              Upload CSV file
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={this.nextStep(1)} completed={false}>
              Progress
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={this.nextStep(2)} completed={false}>
              Done
            </StepButton>
          </Step>
        </Stepper>
      </div>
    )
  }
}

ImportStepper.propTypes = {
  activeStep: number.isRequired,
  classes: object,
}

export default withStyles(styles)(ImportStepper)
