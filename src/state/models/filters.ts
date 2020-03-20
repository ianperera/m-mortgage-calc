export interface LoanPrograms {
	conforming: boolean
	fha: boolean
	jumbo: boolean
	usda: boolean
	va: boolean
}

export interface LoanProducts {
	30: boolean
	25: boolean
	20: boolean
	15: boolean
	10: boolean
}

export interface InterestRate {
	top: number
	bottom: number
	step: number
	minValue: number
	maxValue: number
}

export interface LenderFees {
	top: number
	bottom: number
	step: number
	minValue: number
	maxValue: number
}

export interface FilterSelections {
	loanPrograms: LoanPrograms
	loanProducts: LoanProducts
	interestRate: InterestRate
	lenderFees: LenderFees
}
