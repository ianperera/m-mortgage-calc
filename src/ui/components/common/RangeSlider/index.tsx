import * as React from 'react';
import { Range } from 'rc-slider';
import { Theme, Grid, Typography } from '@material-ui/core';
import { withTheme, withStyles, WithStyles, createStyles } from '@material-ui/core/styles';

import 'rc-slider/assets/index.css';

const percentFormatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3 });
const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const styles = (theme: Theme) => createStyles({
	root: {
		padding: theme.spacing(0, 1),
	},
	maxQuote: {
		marginRight: theme.spacing(-1)	
	},
	minQuote: {
		marginLeft: theme.spacing(-1)	
	},
});

interface InnerProps extends WithStyles<typeof styles> {
	theme: Theme;
	min?: number;
	max?: number;
	value?: number[];
	defaultValue?: Array<number>;
	step?: number;
	unit?: string;
	onChange: (value: Array<number>) => void;
}

export class RangeSlider extends React.PureComponent<InnerProps> {
	static defaultProps = {
		min: 0,
		max: 100,
		value: [0, 0],
		step: 1,
		unit: '',
		defaultValue: [0, 0]
	}

	private handleChange = (value: Array<number>) => {
		this.props.onChange(value);
	}

	public render() {
		const { theme, value, min, max, defaultValue, step, unit, classes } = this.props;
		const formatter = unit === '%' ? percentFormatter : currencyFormatter;
		return (
			<div className={classes.root}>
				<Grid container justify='space-between' alignItems='center'>
					<Grid item classes={{ item: classes.minQuote }}>
						<Typography gutterBottom>{value && formatter.format(value[0])}{unit === '%' && unit}</Typography>
					</Grid>
					<Grid item classes={{ item: classes.maxQuote }}>
						<Typography gutterBottom>{value && formatter.format(value[1])}{unit === '%' && unit}</Typography>
					</Grid>
				</Grid>
				<Range
					allowCross={false}
					defaultValue={defaultValue}
					min={min}
					max={max}
					value={value}
					step={step}
					pushable
					onChange={this.handleChange}
					handleStyle={
						[
							{
								backgroundColor: theme.palette.secondary.main,
								borderColor: theme.palette.secondary.main,
								boxShadow: 	'none'
							},
							{
								backgroundColor: theme.palette.secondary.main,
								borderColor: theme.palette.secondary.main,
								boxShadow: 	'none'
							}
						]
					}
					railStyle={{ backgroundColor: '#e0e0e0' }}
					trackStyle={[{backgroundColor: theme.palette.secondary.main}]}
				/>
			</div>
		)
	}
}

export default withStyles(styles)(withTheme(RangeSlider));