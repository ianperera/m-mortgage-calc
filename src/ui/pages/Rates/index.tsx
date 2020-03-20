import * as React from 'react';
import { Grid, Collapse, CircularProgress } from '@material-ui/core';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import { getProducts } from '@/state/routines/products';
import { normalizedResults, NormalizedResults } from '@/state/selectors/products';

import PageWrapper from '@/ui/wrappers/PageWrapper';
import SectionWrapper from '@/ui/wrappers/SectionWrapper';
import PropertyPanel from '@/ui/components/PropertyPanel';
import { reconnect } from '@/state/utils';

import FilterSelections from './Filters/FilterSelections';
import FilterResults from './Filters/FilterResults';
import ResultHeader from './ResultHeader';
import PricingInfo from '@/ui/components/PricingInfo';
import { StateTypes } from '@/state/models'
import { SearchCriteria } from '@/state/reducers/search'
import styles from './Rates.style';

const injectProps = reconnect({
	selectors: {
		normalizedResults,
		criteria: (state: StateTypes) => state.search.get('criteria')
	},
	routines: {
		getProducts
	}
})

interface OwnProps {
	normalizedResults: NormalizedResults
	getProducts: Function
	criteria?: SearchCriteria
}

interface OwnState {
	showPricingInfo: boolean
}

type IProps = WithStyles<typeof styles> & OwnProps;

class RatesPage extends React.Component<IProps, OwnState> {
	state = {
		showPricingInfo: false
	}

	public componentDidMount() {
		this.props.getProducts(this.props.criteria);
	}

	private handleEditScenario = () => {
		this.setState({ showPricingInfo: true })
	}

	private handleCloseEditor = () => {
		this.setState({ showPricingInfo: false })
	}

	public render() {
		const { classes, normalizedResults } = this.props;
		const { showPricingInfo } = this.state;

		return (
			<PageWrapper>
				<Collapse collapsedHeight="104px" in={showPricingInfo}>
					<SectionWrapper className={classes.resultHeader}>
						{!showPricingInfo && <ResultHeader onEditScenario={this.handleEditScenario} />}
						<PricingInfo isResultPage onCloseEditor={this.handleCloseEditor}/>
					</SectionWrapper>
				</Collapse>
				<SectionWrapper>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4} lg={3}>
							<FilterSelections />
							<FilterResults />
						</Grid>
						<Grid classes={{ item: classes.productWrapper }} item xs={12} md={8} lg={9}>
							{!Object.keys(normalizedResults).length && <div className={classes.loadingWrapper} >
								<CircularProgress />
							</div>}
							{Object.keys(normalizedResults).map((title: string, idx: number) => (
								<PropertyPanel title={title} key={idx} items={normalizedResults[title]} />
							))}
						</Grid>
					</Grid>
				</SectionWrapper>
			</PageWrapper>
		);
	}
}

export default withStyles(styles)(injectProps(RatesPage));
