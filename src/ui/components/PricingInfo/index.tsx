import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import classNames from 'classnames';
import { Grid, InputAdornment, RadioGroup, Typography, FormControlLabel, Radio, Divider, Select, MenuItem, Tabs, Tab, Button, Theme, Icon, Hidden, Paper } from '@material-ui/core';
import { ThemeProvider, WithStyles, withStyles } from '@material-ui/styles';
import { withTheme } from '@material-ui/core/styles';
import Input from '@/ui/components/common/SelectInputBase';
import CustomInput from '@/ui/components/common/CustomInput';
import NearbyLocation from '@/ui/components/common/NearbyLocation';
import VAProperty from '@/ui/components/VAProperty';
import { reconnect } from '@/state/utils';
import { parseInputValue } from '@/utils'
import { setSearchCriteria } from '@/state/actions/search';
import { getProducts } from '@/state/routines/products';
import { searchInputValues, loanPurpose, binaryOptions, selectCriteria, userLocation } from '@/state/selectors/search'
import { CustomInputType, CustomInput as CustomInputProps } from '@/models/input'
import { SELECT_OPTIONS } from '@/contants/form-select-options';

import styles, { resultPageTheme } from './PricingInfo.style';
import { SearchCriteria } from '@/state/reducers/search';
import { StateTypes } from '@/state/models';

const LOAN_PURPOSE: Array<'PURCHASE' | 'FEFINANCE'> = ['PURCHASE', 'FEFINANCE'];

interface IProps extends RouteComponentProps {
	isResultPage?: boolean
	theme: Theme
	onCloseEditor?: () => void
	setSearchCriteria?: (payload: any) => void
	searchInputValues?: any
	loanPurpose?: string | 'PURCHASE' | 'FEFINANCE'
	binaryOptions?: any
	selectCriteria?: any
	userLocation?: any
	criteria?: SearchCriteria
	getProducts?: (criteria: SearchCriteria) => void
}

type OwnProps = IProps & WithStyles<typeof styles>;

interface AnyTypes {
	[key: string]: any;
}

interface IState extends AnyTypes {
	escrowType: string
	occupancyType: string
	propertyType: string
	creditScore: string
	isVA: string
	lockPeriod: number
	openAdvanced: Boolean,
	error: any
}

const injectProps = reconnect({
	actions: {
		setSearchCriteria
	},
	selectors: {
		searchInputValues,
		loanPurpose,
		binaryOptions,
		selectCriteria,
		userLocation,
		criteria: (state: StateTypes) => state.search.get('criteria')
	},
	routines: {
		getProducts
	}
})

class PricingInfo extends React.PureComponent<OwnProps, IState> {
	state = {
		escrowType: 'YES',
		occupancyType: '',
		creditScore: '',
		propertyType: '',
		gilad: true,
		isVA: 'NO',
		cashOut: 'NO',
		lockPeriod: 30,
		openAdvanced: false,
		error: {
			salesPrice: false,
			down: false,
			loanAmount: false,
			propertyValue: false,
			ltv: false,
			occupancyType: false,
			propertyType: false,
			creditScore: false,
			desiredLockPeriod: false,
			location: false
		}
	}

	static defaultProps = {
		isResultPage: false,
		onCloseEditor: () => {}
	}

	handleInputChange = (inputType: CustomInputType) => (evt: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = evt.target
		const newValue = parseInputValue(value, inputType)
		if(newValue) {
			this.props.setSearchCriteria({ key: name, value: newValue })
			this.setState(prevState => ({
				error: { ...prevState.error, [name]: !newValue.value }
			}))
		}
	}

	handleInputBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
		const { salesPrice, down, propertyValue, ltv, loanAmount } = this.props.searchInputValues
		let newValue: CustomInputProps = { value: '', number: 0 }
		
		if (salesPrice.number) {
			if (evt.target.name === 'loanAmount') {
				const down =  ((salesPrice.number - loanAmount.number) / salesPrice.number *100).toFixed(2);
				newValue = parseInputValue(down, 'Integer');
				this.setState(prevState => ({ error: { ...prevState.error, down: !newValue.value }}));
				this.props.setSearchCriteria({ key: 'down', value: newValue })
				return;
			}

			const loanValue = (salesPrice.number - salesPrice.number * down.number / 100).toString();
			newValue = parseInputValue(loanValue, 'Currency')
			this.setState(prevState => ({ error: { ...prevState.error, loanAmount: !newValue.value }}));
			this.props.setSearchCriteria({ key: 'loanAmount', value: newValue })
		}

		if (propertyValue.number) {
			if (evt.target.name === 'loanAmount') {
				const ltv =  (loanAmount.number / propertyValue.number *100).toFixed(2);
				newValue = parseInputValue(ltv, 'Integer');
				this.setState(prevState => ({ error: { ...prevState.error, ltv: !newValue.value }}));
				this.props.setSearchCriteria({ key: 'ltv', value: newValue })
				return;
			}

			const loanValue = (propertyValue.number * ltv.number / 100).toString();
			newValue = parseInputValue(loanValue, 'Currency')
			this.setState(prevState => ({ error: { ...prevState.error, loanAmount: !newValue.value }}));
			this.props.setSearchCriteria({ key: 'loanAmount', value: newValue })
		}
	}

	private handleChangeSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		this.props.setSearchCriteria({ key: evt.target.name, value: evt.target.value });
		this.setState(prevState => ({ error: { ...prevState.error, [evt.target.name]: !evt.target.value }}));
	}

	private handleChangeRadio = (evt: any, value: string) => {
		const binary: any = { YES: true, NO: false };
		this.props.setSearchCriteria({ key: evt.target.name, value: binary[value] })
	}

	private handleChangeTab = (evt: React.ChangeEvent<{}>, value: any) => {
		this.props.setSearchCriteria({ key: 'loanPurpose', value: LOAN_PURPOSE[value]});
	}

	private handleChangeLocation = (location: { state: string, county: string }) => {
		this.props.setSearchCriteria({ key: 'location', value: location });
		this.setState(prevState => ({ error: { ...prevState.error, location: !location.state || !location.county}}))
	}

	private toggleAdvanced = () => {
    this.setState(prevState => ({
      openAdvanced: !prevState.openAdvanced
    }))
  }

  private handleGetRates = () => {
		const isValid = this.checkValidation();
		if(isValid) {
			this.props.getProducts(this.props.criteria)
			this.props.onCloseEditor();
			if(!this.props.isResultPage) {
				this.props.history.push('/rates');
			}
		}
	}
	
	private checkValidation = () => {
		const { searchInputValues, selectCriteria, loanPurpose, userLocation } = this.props
		const { creditScore, occupancyType, propertyType } = selectCriteria
		let error: any = {}
		let isValid = true
		if (loanPurpose) {
			const { salesPrice, down, loanAmount } = searchInputValues
			error = {
				salesPrice: !salesPrice.value,
				down: !down.value,
				loanAmount: !loanAmount.value,
				creditScore: !creditScore,
				occupancyType: !occupancyType,
				propertyType: !propertyType,
				location: !userLocation.state || !userLocation.county
			}
		} else {
			const { propertyValue, ltv, loanAmount } = searchInputValues
			error = {
				propertyValue: !propertyValue.value,
				ltv: !ltv.value,
				loanAmount: !loanAmount.value,
				creditScore: !creditScore,
				occupancyType: !occupancyType,
				propertyType: !propertyType,
				location: !userLocation.state || !userLocation.county
			}
		}

		isValid = !Object.keys(error).reduce((acc, cur) => acc || error[cur], false);

		if(!isValid) {
			this.setState({error: { ...error }});
		}

		return isValid
	}

	private renderInputs() {
		const { loanPurpose, classes } = this.props;
		const { salesPrice, loanAmount, down, propertyValue, ltv } = this.props.searchInputValues
		const { error } = this.state;
		if (loanPurpose === 'PURCHASE') {
			return (
				<>
					<Grid container spacing={1} classes={{ container: classes.container }}>
						<Grid item xs={7}>
							<CustomInput
								error={error.salesPrice}
								id='sales-price'
								name='salesPrice'
								label='Sales Price'
								fullWidth
								variant='filled'
								value={salesPrice.value}
								onChange={this.handleInputChange('Currency')}
								onBlur={this.handleInputBlur}
								startAdornment={<InputAdornment classes={{ positionStart: classes.startAdornment }} position='start'>$</InputAdornment>}
							/>
						</Grid>
						<Grid item xs={5}>
							<CustomInput
								error={error.down}
								id='down'
								label='Down'
								name='down'
								fullWidth
								variant='filled'
								value={down.value}
								onChange={this.handleInputChange('Integer')}
								onBlur={this.handleInputBlur}
								startAdornment={<InputAdornment classes={{ positionStart: classes.startAdornment }} position='start'>%</InputAdornment>}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={1} classes={{ container: classes.container }}>
						<Grid item xs={12}>
							<CustomInput
								error={error.loanAmount}
								id='loan-amount'
								name='loanAmount'
								label='Loan Amount'
								variant='filled'
								value={loanAmount.value}
								onChange={this.handleInputChange('Currency')}
								onBlur={this.handleInputBlur}
								fullWidth
								startAdornment={<InputAdornment classes={{ positionStart: classes.startAdornment }} position='start'>$</InputAdornment>}
							/>
						</Grid>
					</Grid>
				</>
			)
		}
		return (
			<>
				<Grid container spacing={1} classes={{ container: classes.container }}>
					<Grid item xs={12}>
						<CustomInput
							error={error.propertyValue}
							id='property-value'
							label='Property Value'
							name='propertyValue'
							value={propertyValue.value}
							onChange={this.handleInputChange('Currency')}
							onBlur={this.handleInputBlur}
							variant='filled'
							fullWidth
							startAdornment={<InputAdornment classes={{ positionStart: classes.startAdornment }} position='start'>$</InputAdornment>}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={1} classes={{ container: classes.container }}>
					<Grid item xs={6}>
						<CustomInput
							error={error.loanAmount}
							id='loan-amount'
							label='Loan Amount'
							value={loanAmount.value}
							onChange={this.handleInputChange('Currency')}
							onBlur={this.handleInputBlur}
							name='loanAmount'
							variant='filled'
							fullWidth
							startAdornment={<InputAdornment classes={{ positionStart: classes.startAdornment }} position='start'>$</InputAdornment>}
						/>
					</Grid>
					<Grid item xs={6}>
						<CustomInput
							error={error.ltv}
							id='ltv'
							label='LTV'
							name='ltv'
							value={ltv.value}
							onChange={this.handleInputChange('Integer')}
							onBlur={this.handleInputBlur}
							fullWidth
							variant='filled'
							startAdornment={<InputAdornment classes={{ positionStart: classes.startAdornment }} position='start'>%</InputAdornment>}
						/>
					</Grid>
				</Grid>
			</>
		);
	}

	public render() {
		const { isResultPage, binaryOptions, theme, selectCriteria, userLocation, classes } = this.props;
		const { error } = this.state;
		return (
			<ThemeProvider theme={isResultPage ? resultPageTheme : theme}>
				<Paper className={classes.formWrapper}>
				{!isResultPage && <Typography variant="h6" color="textPrimary" gutterBottom>
					GET YOUR QUOTE NOW
				</Typography>}
					<Grid container spacing={2}>
						{isResultPage && <Grid item md={2} sm={3}>
							<Typography variant="h6" align="left"><strong>Refine % Results</strong></Typography>
						</Grid>}
						<Grid item md={isResultPage ? 4 : 12} sm={isResultPage ? 9 : 12} xs={12}>
							<Tabs
								variant="fullWidth"
								value={this.props.loanPurpose === 'PURCHASE' ? 0 : 1}
								indicatorColor="primary"
								textColor="primary"
								onChange={this.handleChangeTab}
								classes={{ root: classNames([classes.tabWrapper, isResultPage && classes.tabWrapper__result]), indicator: classes.indicator }}
							>
								<Tab label="PURCHASE" classes={{ textColorPrimary: classes.tabLabel }} />
								<Tab label="REFINANCE" classes={{ textColorPrimary: classes.tabLabel }} />
							</Tabs>
							{this.props.loanPurpose === 'FEFINANCE' && (
								<>
									<Grid
										container spacing={1}
										direction='row'
										justify='space-between'
										alignItems='center'
										classes={{ container: classes.container }}
									>
										<Grid item>
											<Typography variant='subtitle1'>Cash out?</Typography>
										</Grid>
										<Grid item>
											<RadioGroup
												aria-label='cashOut'
												name='isCashOut'
												row
												value={binaryOptions.isCashOut ? 'YES' : 'NO' }
												onChange={this.handleChangeRadio}
											>
												<FormControlLabel value={'YES'} control={<Radio color='primary' classes={{ root: classes.radiobox }} />} labelPlacement='end' label='Yes' />
												<FormControlLabel value={'NO'} control={<Radio color='primary' classes={{ root: classes.radiobox }} />} labelPlacement='end' label='No' />
											</RadioGroup>
										</Grid>
									</Grid>
									{!isResultPage && <Divider classes={{ root: classes.divider }} />}
								</>)}
							{this.renderInputs()}
							<Grid
								container
								spacing={1}
								direction='row'
								justify='space-between'
								alignItems='center'
								classes={{ container: classes.container }}
							>
								<Grid item>
									<Typography variant='subtitle1'>Waive Escrow?</Typography>
								</Grid>
								<Grid item>
									<RadioGroup
										aria-label='waive-escrow'
										name='isWaiveEscrow'
										row
										value={binaryOptions.isWaiveEscrow ? 'YES' : 'NO'}
										onChange={this.handleChangeRadio}
									>
										<FormControlLabel value={'YES'} control={<Radio color='primary' classes={{ root: classes.radiobox }} />} labelPlacement='end' label='Yes' />
										<FormControlLabel value={'NO'} control={<Radio color='primary' classes={{ root: classes.radiobox }} />} labelPlacement='end' label='No' />
									</RadioGroup>
								</Grid>
							</Grid>
							{isResultPage && <Select
								fullWidth
								value={selectCriteria.desiredLockPeriod}
								input={<Input name="desiredLockPeriod" />}
								onChange={this.handleChangeSelect}
								displayEmpty
							>
								<MenuItem value={30}>30 Day Lock</MenuItem>
								<MenuItem value={45}>45 Day Lock</MenuItem>
								<MenuItem value={60}>60 Day Lock</MenuItem>
							</Select>}
							<Divider classes={{ root: classes.divider }} />
						</Grid>
						{isResultPage && <Hidden mdUp>
							<Grid item sm={3} />
						</Hidden>}
						<Grid item md={isResultPage ? 4 : 12} sm={isResultPage ? 9 : 12} xs={12}>
							<Grid container classes={{ container: classNames([classes.container, isResultPage && classes.noTopMargin]) }}>
								<Select
									fullWidth
									value={selectCriteria.occupancyType}
									input={<Input name='occupancyType' error={error.occupancyType} />}
									onChange={this.handleChangeSelect}
									displayEmpty
								>
									<MenuItem value=''><em>Select Occupancy Type</em></MenuItem>
									{SELECT_OPTIONS.occupancy_type.map(type => <MenuItem value={type.key} key={type.key}>{type.label}</MenuItem>)}
								</Select>
							</Grid>
							<Grid container classes={{ container: classes.container }}>
								<Select
									fullWidth
									value={selectCriteria.propertyType}
									input={<Input name='propertyType' error={error.propertyType} />}
									onChange={this.handleChangeSelect}
									displayEmpty
								>
									<MenuItem value=''><em>Select Propety Type</em></MenuItem>
									{SELECT_OPTIONS.property_type.map(type => <MenuItem value={type.key} key={type.key}>{type.label}</MenuItem>)}
								</Select>
							</Grid>
							<Grid container classes={{ container: classes.container }}>
								<Select
									fullWidth
									value={selectCriteria.creditScore}
									input={<Input name='creditScore' error={error.creditScore} />}
									onChange={this.handleChangeSelect}
									displayEmpty
								>
									<MenuItem value=''><em>Select Credit Score</em></MenuItem>
									{SELECT_OPTIONS.credit_score.map(type => <MenuItem value={type.key} key={type.key}>{type.label}</MenuItem>)}
								</Select>
							</Grid>
							<NearbyLocation location={userLocation} onChangeLocation={this.handleChangeLocation}/>
							<VAProperty />
							<Divider classes={{ root: classes.divider }} />
							{!isResultPage && <Grid container spacing={1}>
								<Grid item xs={6}>
									<Button
										variant="outlined"
										color="secondary"
										fullWidth
										className={classes.button}
										onClick={this.toggleAdvanced}>
										ADVANCED OPTIONS
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button
										variant="contained"
										color="secondary"
										fullWidth
										onClick={this.handleGetRates}
										className={classes.button}
										classes={{label: classes.btnTextPrimary}}>
										GET RATES
									</Button>
								</Grid>
							</Grid>}
						</Grid>
						{isResultPage && <Hidden mdUp>
							<Grid item sm={6} />
						</Hidden>}
						{isResultPage && <Grid item md={2} sm={6}>
							<Grid container spacing={2} justify="flex-end">
								<Grid item>
									<Button
										variant="contained"
										color="secondary"
										onClick={this.handleGetRates}
										classes={{ label: classes.btnTextPrimary }}>
										Refine Scenario
									</Button>
								</Grid>
								<Grid item>
									<Button
										variant="outlined"
										color="secondary"
										classes={{ label: classes.btnTextPrimary, root: classes.cancelBtn }}
										onClick={this.props.onCloseEditor}
									>
										<Icon>close</Icon>
										Cancel
									</Button>
								</Grid>
							</Grid>
						</Grid>}
					</Grid>
				</Paper>
				{!isResultPage && <Paper className={classNames([classes.advancedBox, this.state.openAdvanced && classes.opened])}>
					<Typography variant="h6" color="textPrimary" gutterBottom>
						Advanced Options
					</Typography>
					<Divider classes={{ root: classes.divider }} />
					<Grid container classes={{container: classes.container }}>
						<Select
							fullWidth
							value={selectCriteria.desiredLockPeriod}
							input={<Input name="desiredLockPeriod" />}
							onChange={this.handleChangeSelect}
							displayEmpty
						>
							<MenuItem value={30}>30 Day Lock</MenuItem>
							<MenuItem value={45}>45 Day Lock</MenuItem>
							<MenuItem value={60}>60 Day Lock</MenuItem>
						</Select>
					</Grid>
					<Divider classes={{ root: classes.divider }} />
					<Grid container className={classNames([classes.container, classes.spacingTop])}>
						<Button
							variant="outlined"
							color="secondary"
							className={classes.button}
							onClick={this.toggleAdvanced}>
							<Icon>chevron_left</Icon>
							Close
						</Button>
					</Grid>
				</Paper>}
			</ThemeProvider>
		)
	}
}

export default withStyles(styles)(injectProps((withRouter(withTheme(PricingInfo)))));
