import * as React from 'react';
import {
	ExpansionPanel,
	ExpansionPanelSummary,
	Typography,
	ExpansionPanelDetails,
	Icon,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Button
} from '@material-ui/core';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import { Product } from '@/state/reducers/products';
import styles from './PropertyPanel.style';

const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);


interface IProps {
	title: string;
	items: Product[];
}

type OwnProps = IProps & WithStyles<typeof styles>;

class PropertyPanel extends React.PureComponent<OwnProps> {
	public render(): JSX.Element {
		const { classes, title, items } = this.props;
		return (
			<ExpansionPanel classes={{root: classes.root}}>
				<ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
					<Typography className={classes.heading}>{title}</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails classes={{ root: classes.propertyDetail}}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<CustomTableCell>Rate (%)</CustomTableCell>
								<CustomTableCell align="center">Payment ($)</CustomTableCell>
								<CustomTableCell align="center">Lender Fees ($)</CustomTableCell>
								<CustomTableCell align="center">APR</CustomTableCell>
								<CustomTableCell align="center"></CustomTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{items.map((item, idx) => (
								<TableRow className={classes.row} key={idx}>
									<CustomTableCell component="th" scope="row">
										{item.rate.toFixed(3)}
									</CustomTableCell>
									<CustomTableCell align="center">{new Intl.NumberFormat('en-US', {  minimumFractionDigits: 2 }).format(item.totalPayment)}</CustomTableCell>
									<CustomTableCell align="center">{new Intl.NumberFormat('en-US').format(item.discount)}</CustomTableCell>
									<CustomTableCell align="center">{new Intl.NumberFormat('en-US', { minimumFractionDigits: 3 }).format(item.apr)}</CustomTableCell>
									<CustomTableCell align="center">
										<Button
											variant="contained"
											color="secondary"
											fullWidth
											// onClick={this.handleGetRates}
											className={classes.button}
											classes={{ label: classes.btnTextPrimary }}>
											Apply Now
											<Icon>chevron_right</Icon>
              			</Button>
									</CustomTableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}

export default withStyles(styles)(PropertyPanel);