import * as React from 'react';
import { Paper, Grid, Typography, Switch, Collapse, Divider } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { reconnect } from '@/state/utils';

import RangeSlider from '@/ui/components/common/RangeSlider';
import { StateTypes } from '@/state/models';
import { setFilterResults } from '@/state/actions/filters';
import { InterestRate, LenderFees } from '@/state/models/filters';
import styles from './FilterResults.style';

type IState = {
	showMore: boolean
}

interface InnerProps {
	interestRate?: InterestRate
	lenderFees?: LenderFees,
	setFilterResults?: (filterData: { name: string, criteria: any }) => void
}

type IProps = WithStyles<typeof styles> & WithWidth & InnerProps;

const injectProps = reconnect({
	selectors: {
		interestRate: (state: StateTypes) => state.filterResults.get('interestRate'),
		lenderFees: (state: StateTypes) => state.filterResults.get('lenderFees')
	},
	actions: {
		setFilterResults
	}
})

export class FilterResults extends React.PureComponent<IProps, IState> {
	state = {
		showMore: !['sm', 'xs'].includes(this.props.width)
	}

	componentDidUpdate(prevProps: IProps) {
		if (prevProps.width !== this.props.width) {
			this.setState({ showMore: !['sm', 'xs'].includes(this.props.width) })
		}
	}

	private handleSwitch = (evt: any) => {
		this.setState({ showMore: evt.target.checked })
	}

	private handleRangeChange = (rangeName: any) => ([minValue, maxValue]: number[]) => {
		this.props.setFilterResults({ name: rangeName, criteria: { minValue, maxValue }})
	}

	public render() {
		const { classes, interestRate, lenderFees } = this.props;
		return (
			<Paper classes={{ root: classes.wrapper }}>
				<Grid container spacing={1} justify="space-between" alignItems="center">
					<Grid item>
						<Typography variant="subtitle1" classes={{ root: classes.title }}>
							Filter Results
						</Typography>
					</Grid>
					<Grid item>
						<Switch
							checked={this.state.showMore}
							onChange={this.handleSwitch}
							value="selections"
							color="secondary"
						/>
					</Grid>
				</Grid>
				<Collapse in={this.state.showMore}>
					<div>
						<Divider />
						<Grid container spacing={1} classes={{ container: classes.filterContainer }}>
							<Grid item xs={12}>
								<Typography variant="subtitle2">Interest Rate</Typography>
							</Grid>
							<Grid item xs={12}>
								<RangeSlider
									min={interestRate.bottom}
									max={interestRate.top}
									step={interestRate.step}
									value={[interestRate.minValue, interestRate.maxValue]}
									unit='%'
									onChange={this.handleRangeChange('interestRate')}
								/>
							</Grid>
						</Grid>
					</div>
					<div>
						<Divider />
						<Grid container spacing={1} classes={{ container: classes.filterContainer }}>
							<Grid item xs={12}>
								<Typography variant="subtitle2">Lender Fees</Typography>
							</Grid>
							<Grid item xs={12}>
								<RangeSlider
									min={lenderFees.bottom}
									max={lenderFees.top}
									step={lenderFees.step}
									value={[lenderFees.minValue, lenderFees.maxValue]}
									unit='$'
									onChange={this.handleRangeChange('lenderFees')}
								/>
							</Grid>
						</Grid>
					</div>
				</Collapse>
			</Paper>
		)
	}
}

export default withStyles(styles)(withWidth()(injectProps(FilterResults)));
