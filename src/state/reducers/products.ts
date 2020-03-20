import { List } from 'immutable';

export interface Product {
	apr: number;
	armIndex: string;
	closingCost: number;
	lastUpdate: string;
	loanTerm: string;
	lockPeriod: number;
	armMargin: number;
	price: number;
	rate: number;
	rebate: number;
	discount: number;
	principalAndInterest: number;
	monthlyMI: number;
	totalPayment: number;
	amortizationTerm: string;
	amortizationType: string;
	investor: string;
	loanType: string;
	priceStatus: string;
	pendingUpdate: boolean;
	productCode: string;
	productId: number;
	productName: string;
}

export interface RateResultState {
	items: List<Product>
}

export const setProducts = (state: any, products: List<Product>) => state.setIn(['products', 'items'], products)
