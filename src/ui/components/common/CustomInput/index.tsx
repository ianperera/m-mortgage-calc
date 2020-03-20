import * as React from 'react';
import _ from 'lodash';
import { InputLabel, Theme, FormControl, FilledInput } from '@material-ui/core';
import { FilledInputProps } from '@material-ui/core/FilledInput';
import { FormControlProps } from '@material-ui/core/FormControl';
import { createStyles } from '@material-ui/core/styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) => createStyles({
  root: {
		color: theme.palette.grey[500]
  },
  focused: {
    color: '#86af48 !important'
  },
  inputRoot: {
    backgroundColor: '#f0f0f0',
    borderRadius: '4px 4px 0 0'
  },
  input: {
    color: '#424242'
  }
})

interface InnerProps {
  label: string
}

type IProps =  WithStyles<typeof styles> & FilledInputProps & FormControlProps & InnerProps

const CustomInput: React.SFC<IProps> = props => {
  const { label, id, classes, fullWidth, variant, ...inputProps } = props
  return (
    <FormControl variant={variant} fullWidth={fullWidth} classes={{root: classes.inputRoot}}>
      <InputLabel htmlFor={id} classes={{ root: classes.root, focused: classes.focused }}>{label}</InputLabel>
      <FilledInput {...inputProps} id={id} classes={{input: classes.input}}/>
    </FormControl>
  )
}

export default withStyles(styles)(CustomInput)
