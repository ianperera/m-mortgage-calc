import { Record, Map, List, fromJS } from 'immutable'
import { StateTypes } from '@/state/models'

const getLocalStorage = () => {
	return JSON.parse(window.localStorage.getItem('data') || '{}');
}

const persistedState = getLocalStorage();

export const State = Record<StateTypes>({
	products: Map({
		items: List([])
	}),
	search: Map({
		criteria: {
			loanPurpose: 'PURCHASE',
			salesPrice: {
				value: '',
				number: 0
			},
			down: {
				value: '20',
				number: 20
			},
			loanAmount: {
				value: '',
				number: 0
			},
			propertyValue: {
				value: '',
				number: 0
			},
			ltv: {
				value: '80',
				number: 80
			},
			isWaiveEscrow: false,
			isCashOut: true,
			occupancyType: '',
			propertyType: '',
			creditScore: '',
			location: {
				state: '',
				county: ''
			},
			desiredLockPeriod: 30,
			Veteran: {
				isActive: false,
				militaryExp: '',
				isTenPercent: false,
				isLoanUsed: false
			}
		}
	}).mergeDeep(fromJS(persistedState.search)),
	filterResults: Map({
		loanPrograms: {
			conforming: true,
			fha: true,
			jumbo: true,
			usda: false,
			va: true,
		},
		loanProducts: {
			30: true,
			25: true,
			20: true,
			15: true,
			10: true
		},
		interestRate: {
			top: 100,
			bottom: 0,
			step: 0.125,
			minValue: 1,
			maxValue: 100
		},
		lenderFees: {
			top: 20000,
			bottom: -5000,
			step: 1000,
			minValue: -5000,
			maxValue: 20000
		}
	}).mergeDeep(fromJS(persistedState.filterResults))
});
