import React from 'react';
import { Grid, Typography, RadioGroup, FormControlLabel, Radio, Divider, MenuItem, Select, FormControl, Checkbox } from '@material-ui/core';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import Input from '@/ui/components/common/SelectInputBase'
import { setSearchCriteria } from '@/state/actions/search'
import { vaProperty } from '@/state/selectors/search'
import { reconnect } from '@/state/utils'
import { SELECT_OPTIONS } from '@/contants/form-select-options'
import styles from './VAProperty.styles'

interface InnerProps {
  setSearchCriteria?: (payload: any) => void
  vaProperty?: any
}

interface IState {
  isActive: boolean
  militaryExp: string
  isTenPercent: boolean
  isLoanUsed: boolean
}

type AnonyState = { [key: string]: any };

const injectProps = reconnect({
  actions: {
    setSearchCriteria
  },
  selectors: {
    vaProperty
  }
})

class VAProperty extends React.PureComponent<InnerProps & WithStyles<typeof styles>, IState & AnonyState> {
  state = {
    isActive: false,
    militaryExp: '',
    isTenPercent: false,
    isLoanUsed: false
  };

  toggleChangeVA = (evt: React.ChangeEvent<{}>, value: any) => {
    const binary: any = { YES: true, NO: false };
    this.setState({ isActive: binary[value] }, () => {
      const property = { ...this.state };
      this.setVAProperty(property)
    });
  }

  handleCheckbox = (evt: React.ChangeEvent<HTMLInputElement>, checked: any) => {
    this.setState({ [evt.target.name]: checked }, () => {
      const property = { ...this.state };
      this.setVAProperty(property)
    });
  }

  handleChangeVAExp = (evt: any) => {
    this.setState({ militaryExp: evt.target.value }, () => {
      const property = { ...this.state };
      this.setVAProperty(property)
    });
  }

  setVAProperty = (property: any) => {
    this.props.setSearchCriteria({key: 'Veteran', value: property})
  }

  render() {
    const { classes, vaProperty: { isActive, militaryExp, isTenPercent, isLoanUsed } } = this.props;
    return (
      <React.Fragment>
        <Grid
          container spacing={1}
          direction='row'
          justify='space-between'
          alignItems='center'
          classes={{ container: classes.container }}
        >
          <Grid item>
            <Typography variant='subtitle1'>Military / Veteran?</Typography>
          </Grid>
          <Grid item>
            <RadioGroup
              aria-label='va'
              name='va'
              row
              value={isActive ? 'YES' : 'NO'}
              onChange={this.toggleChangeVA}
            >
              <FormControlLabel value={'YES'} control={<Radio color='primary' classes={{ root: classes.radiobox }} />} labelPlacement='end' label='Yes' />
              <FormControlLabel value={'NO'} control={<Radio color='primary' classes={{ root: classes.radiobox }} />} labelPlacement='end' label='No' />
            </RadioGroup>
          </Grid>
        </Grid>
        {
          isActive && (
            <div className={classes.militaryExp}>
              <Divider classes={{ root: classes.divider }} />
              <Grid container classes={{ container: classes.container }}>
                <Select
                  fullWidth
                  value={militaryExp}
                  input={<Input name='militaryExp' />}
                  onChange={this.handleChangeVAExp}
                  displayEmpty
                >
                  <MenuItem value=''><em>Select Military Experience</em></MenuItem>
                  {SELECT_OPTIONS.va_exp.map(option => <MenuItem value={option.key} key={option.key}>{option.label}</MenuItem>)}
                </Select>
              </Grid>
              <Grid container>
                <FormControl>
                  <FormControlLabel
                    classes={{ root: classes.checkFormLabel }}
                    control={<Checkbox name="isTenPercent" onChange={this.handleCheckbox} checked={isTenPercent} color='primary' classes={{ root: classes.checkbox }} />}
                    label='I am 10% or more VA disabled'
                  />
                  <FormControlLabel
                    classes={{ root: classes.checkFormLabel }}
                    control={<Checkbox name='isLoanUsed' onChange={this.handleCheckbox} checked={isLoanUsed} color='primary' classes={{ root: classes.checkbox }} />}
                    label='I have used VA loan before'
                  />
                </FormControl>
              </Grid>
            </div>)
        }
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(injectProps(VAProperty));
