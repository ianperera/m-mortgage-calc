import React from 'react';
import { Grid, Icon, Fab, MenuItem, Select, IconButton } from '@material-ui/core';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Geocode from 'react-geocode';

import Input from '@/ui/components/common/SelectInputBase';
import { states, counties, abbrevToName } from '@/contants/states-counties';
import styles from './NearbyLocation.style';

Geocode.setApiKey('AIzaSyBxrZO5HvA3xbyHpMleE8p5e4Lx2Qe0sWo');

interface InnerProps {
	location: { state: string, county: string };
	onChangeLocation: (location: any) => void
}

type IProps = InnerProps & WithStyles<typeof styles>

class NearbyLocation extends React.PureComponent<IProps> {
	componentDidMount() {
		this.handleNearMe()
	}

	findStateCounty = (addresses: Array<any>): { state: string, county: string } => {
		const countyLevel = addresses.filter(address => address.types.includes('administrative_area_level_2'));
		let state: string = '';
		let county: string = '';
		if (countyLevel && countyLevel.length) {
			county = countyLevel[0].address_components[0].short_name.replace('County', '').trim();
			state = countyLevel[0].address_components[1].short_name;
		}

		return { state, county };
	}

	handleNearMe = () => {
		navigator.geolocation.getCurrentPosition(async (position) => {
			const { latitude, longitude } = position.coords;

			const response = await Geocode.fromLatLng(latitude, longitude);

			if (response.status === 'OK') {
				const { state, county } = this.findStateCounty(response.results);
				this.props.onChangeLocation({ state, county });
			}
		})
	}

	handleChange = (evt: any) => {
		if (evt.target.name === 'state') {
			this.props.onChangeLocation({ state: evt.target.value, county: '' })
		} else {
			this.props.onChangeLocation({ state: this.props.location.state, county: evt.target.value });
		}
	}

	render() {
		const { classes } = this.props;
		const stateLongName = abbrevToName()[this.props.location.state];
		return (
			<Grid container spacing={1}>
				<Grid item>
					<IconButton
						className={classes.iconButton}
						aria-label='NearMe'
						onClick={this.handleNearMe}>
						<Icon>near_me</Icon>
					</IconButton>
				</Grid>
				<Grid item xs>
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<Select
								fullWidth
								value={this.props.location.state}
								input={<Input name='state' error={!this.props.location.state} />}
								onChange={this.handleChange}
								displayEmpty
							>
								<MenuItem value=''><em>Select State</em></MenuItem>
								{states.map((state, idx) => <MenuItem value={state.abbrev} key={idx}>{state.name}</MenuItem>)}
							</Select>
						</Grid>
						<Grid item xs={6}>
							<Select
								fullWidth
								value={this.props.location.county}
								input={<Input name='county' error={!this.props.location.county} />}
								disabled={!this.props.location.state}
								onChange={this.handleChange}
								displayEmpty
							>
								<MenuItem value=''><em>Select County</em></MenuItem>
								{this.props.location.state && counties[stateLongName].map((county, idx) => <MenuItem value={county} key={idx}>{county}</MenuItem>)}
							</Select>
						</Grid>
					</Grid>
				</Grid>
				
			</Grid>
		)
	}
}

export default withStyles(styles)(NearbyLocation);
