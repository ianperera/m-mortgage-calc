import { GlobalsNumber } from "csstype";

interface InputValueType {
	value: string;
	number: number;
}

interface LocationValueType {
	state: string;
	county: string;
}

interface VeteranValueType {
	isActive: boolean;
	militaryExp: string;
	isTenPercent: boolean;
	isLoanUsed: boolean
}

export interface SearchCriteria {
	loanPurpose: string |'PURCHASE' | 'REFINANCE'
	salesPrice: InputValueType
	down: InputValueType
	loanAmount: InputValueType
	propertyValue: InputValueType
	ltv: InputValueType
	isWaiveEscrow: boolean
	isCashOut: boolean
	occupancyType: string
	propertyType: string
	creditScore: string
	desiredLockPeriod: number
	location: LocationValueType
	Veteran: VeteranValueType
}

export const setSearchCriteria = (state: any, payload: { key: string, value: any}) => state.setIn(['search', 'criteria', payload.key ], payload.value);
