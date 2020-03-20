import * as React from 'react';
import { Paper, Grid, Typography, Switch, Collapse, Divider, FormControlLabel, Checkbox } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { reconnect } from '@/state/utils';
import { StateTypes } from '@/state/models';
import { setFilterSelections } from '@/state/actions/filters';
import { LoanProducts, LoanPrograms } from '@/state/models/filters';

import styles from './FilterSelections.style';

interface IState {
	showMore: boolean
}

interface InnerProps {
	loanProducts?: LoanProducts
	loanPrograms?: LoanPrograms
	setFilterSelections?: (param: any) => void
}

type IProps = WithStyles<typeof styles> & WithWidth & InnerProps;

const injectProps = reconnect({
	selectors: {
		loanPrograms: (state: StateTypes) => state.filterResults.get('loanPrograms'),
		loanProducts: (state: StateTypes) => state.filterResults.get('loanProducts')
	},
	actions: {
		setFilterSelections
	}
})

class FilterSelections extends React.PureComponent<IProps, IState> {
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

	private handleCheck = (filterType: string, filterName: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.props.setFilterSelections({ name: filterType, criteria: { [filterName]: evt.target.checked }});
	}  

	public render() {
		const { classes } = this.props;
		const { loanProducts, loanPrograms } = this.props;
		return (
			<Paper classes={{ root: classes.wrapper }}>
				<Grid container spacing={1} justify="space-between" alignItems="center">
					<Grid item>
						<Typography variant="subtitle1" classes={{ root: classes.title }}>
							Filter Selections
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
								<Typography variant="subtitle2">Loan Programs</Typography>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									classes={{ root: classes.checkFormLabel }}
									control={
										<Checkbox
											checked={loanPrograms.conforming}
											onChange={this.handleCheck('loanPrograms', 'conforming')}
											value="conforming"
											color="secondary"
											classes={{ root: classes.checkbox }}
										/>
									}
									label="Conforming"
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									classes={{ root: classes.checkFormLabel }}
									control={
										<Checkbox
											checked={loanPrograms.fha}
											onChange={this.handleCheck('loanPrograms', 'fha')}
											value="fha"
											color="secondary"
											classes={{ root: classes.checkbox }}
										/>
									}
									label="FHA"
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									classes={{ root: classes.checkFormLabel }}
									control={
										<Checkbox
											checked={loanPrograms.jumbo}
											onChange={this.handleCheck('loanPrograms', 'jumbo')}
											value="jumbo"
											color="secondary"
											classes={{ root: classes.checkbox }}
										/>
									}
									label="Jumbo"
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									classes={{ root: classes.checkFormLabel }}
									control={
										<Checkbox
											checked={loanPrograms.va}
											onChange={this.handleCheck('loanPrograms', 'va')}
											value="va"
											color="secondary"
											classes={{ root: classes.checkbox }}
										/>
									}
									label="VA"
								/>
							</Grid>
						</Grid>
					</div>
					<div>
						<Divider />
						<Grid container spacing={1} classes={{ container: classes.filterContainer }}>
							<Grid item xs={12}>
								<Typography variant="subtitle2">Loan Products</Typography>
							</Grid>

							<Grid item xs={6}>
								<FormControlLabel
									classes={{ root: classes.checkFormLabel }}
									control={
										<Checkbox
											checked={loanProducts[30]}
											onChange={this.handleCheck('loanProducts', '30')}
											value="year30"
											color="secondary"
											classes={{ root: classes.checkbox }}
										/>
									}
									label="30 Year"
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									classes={{ root: classes.checkFormLabel }}
									control={
										<Checkbox
											checked={loanProducts[25]}
											onChange={this.handleCheck('loanProducts', '25')}
											value="year25"
											color="secondary"
											classes={{ root: classes.checkbox }}
										/>
									}
									label="25 Year"
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									classes={{ root: classes.checkFormLabel }}
									control={
										<Checkbox
											checked={loanProducts[20]}
											onChange={this.handleCheck('loanProducts', '20')}
											value="year20"
											color="secondary"
											classes={{ root: classes.checkbox }}
										/>
									}
									label="20 Year"
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									classes={{ root: classes.checkFormLabel }}
									control={
										<Checkbox
											checked={loanProducts[15]}
											onChange={this.handleCheck('loanProducts', '15')}
											value="year15"
											color="secondary"
											classes={{ root: classes.checkbox }}
										/>
									}
									label="15 Year"
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControlLabel
									classes={{ root: classes.checkFormLabel }}
									control={
										<Checkbox
											checked={loanProducts[10]}
											onChange={this.handleCheck('loanProducts', '10')}
											value="year10"
											color="secondary"
											classes={{ root: classes.checkbox }}
										/>
									}
									label="10 Year"
								/>
							</Grid>
						</Grid>
					</div>
				</Collapse>
			</Paper>
		)
	}
}

export default withStyles(styles)(withWidth()(injectProps(FilterSelections)));
