import * as React from 'react';
import classNames from 'classnames';
import { Grid, Typography, Button, Hidden } from '@material-ui/core';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { reconnect } from '@/state/utils';
import styles from './ResultsHeader.style';
import { StateTypes } from '@/state/models';
import { SearchCriteria } from '@/state/reducers/search';

interface IProps {
	onEditScenario: () => void;
}

interface InnerProps {
	searchCriteria?: SearchCriteria
}

type OwnProps = WithStyles<typeof styles> & IProps & InnerProps;

const injectProps = reconnect({
	selectors: {
		searchCriteria: (state: StateTypes) => state.search.get('criteria')
	}
})

const ResultHeader: React.SFC<OwnProps> = (props): JSX.Element => (
	<Grid container justify='space-between' alignItems='center' classes={{container: props.classes.root}}>
		<Hidden smDown>
			<Grid item md>
				<ul className={props.classes.content}>
					<li className={props.classes.item}>
						<Typography variant="h5" align="left"><strong>% Results</strong></Typography>
					</li>
					<li className={props.classes.item}>
						<Typography display="inline" variant="subtitle1" align="left" color="textSecondary">PURCHASE</Typography>
					</li>
					<li className={classNames([props.classes.item, props.classes.hasLabel])}>
						<Typography variant="body2" align="left" color="textSecondary"><strong>{`$${props.searchCriteria.loanAmount.value}`}</strong></Typography>
						<Typography variant="caption" align="left" color="textSecondary"><i>Loan Amount</i></Typography>
					</li>
					<li className={classNames([props.classes.item, props.classes.hasLabel])}>
						<Typography variant="body2" align="left" color="textSecondary"><strong>{`$${props.searchCriteria.salesPrice.value}`}</strong></Typography>
						<Typography variant="caption" align="left" color="textSecondary"><i>Sales Price</i></Typography>
					</li>
					<li className={classNames([props.classes.item, props.classes.hasLabel])}>
						<Typography variant="body2" align="left" color="textSecondary"><strong>{props.searchCriteria.occupancyType}</strong></Typography>
						<Typography variant="caption" align="left" color="textSecondary"><i>Occupancy Type</i></Typography>
					</li>
				</ul>
			</Grid>
		</Hidden>
		<Grid item md={2} classes={{ item: props.classes.leftBtn}}>
			<Button
				variant="contained"
				color="secondary"
				onClick={props.onEditScenario}
				classes={{ label: props.classes.btnTextPrimary }}>
				Refine Scenario
      </Button>
		</Grid>
	</Grid>
)

export default withStyles(styles)(injectProps(ResultHeader));
