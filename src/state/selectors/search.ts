import { createSelector } from 'reselect';
import { StateTypes } from '@/state/models';

export const searchInputValues = createSelector(
	(state: StateTypes) => state.search.get('criteria'),
	criteria => {
		const { salesPrice, loanAmount, down, propertyValue, ltv } = criteria;
		return { salesPrice, loanAmount, down, propertyValue, ltv };
	}
);

export const loanPurpose = createSelector(
	(state: StateTypes) => state.search.getIn(['criteria', 'loanPurpose']),
	loanPurpose => loanPurpose
);

export const binaryOptions = createSelector(
	(state: StateTypes) => state.search.get('criteria'),
	criteria => {
		const { isCashOut, isWaiveEscrow } = criteria
		return { isCashOut, isWaiveEscrow };
	}
);

export const selectCriteria = createSelector(
	(state: StateTypes) => state.search.get('criteria'),
	criteria => {
		const { propertyType, occupancyType, creditScore, desiredLockPeriod } = criteria;
		return { propertyType, occupancyType, creditScore, desiredLockPeriod };
	}
);

export const userLocation = createSelector(
	(state: StateTypes) => state.search.getIn(['criteria', 'location']),
	location => location
);

export const vaProperty = createSelector(
	(state: StateTypes) => state.search.getIn(['criteria', 'Veteran']),
	veteran => veteran
)
