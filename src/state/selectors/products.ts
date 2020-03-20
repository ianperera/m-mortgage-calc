import { createSelector } from 'reselect';
import { StateTypes } from '@/state/models';
import { Product } from '@/state/reducers/products';

export interface NormalizedResults {
	[key: string]: Array<Product>
}

export const normalizedResults = createSelector(
	(state: StateTypes) => state.products.get('items'),
	(state: StateTypes) => state.filterResults,
	(products, filters: any) => {
		const loanTerms = filters.get('loanProducts');
		const interestRate = filters.get('interestRate');
		const lenderFees = filters.get('lenderFees');
		const loanPrograms = filters.get('loanPrograms');
		const normalized: any = {};

		products.map((product: Product) => {
			const isValidRate = product.rate >= interestRate.minValue && product.rate <= interestRate.maxValue;
			const isValidLenderFee = product.discount >= lenderFees.minValue && product.discount <= lenderFees.maxValue;
			if (loanTerms[product.loanTerm] && isValidLenderFee && isValidRate && loanPrograms[product.loanType.toLowerCase()]) {
				const key: string = `${product.loanType} ${product.loanTerm} Years ${product.amortizationType}`;
				if (!Object.keys(normalized).includes(key)) {
					normalized[key] = [product];
				} else {
					normalized[key].push(product);
				}
			}
		});

		return normalized;
	}
);
