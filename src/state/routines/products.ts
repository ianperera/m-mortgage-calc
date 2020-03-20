import _ from 'lodash';
import { Dispatch } from 'redux';
import { setProducts } from '@/state/actions/products';
import { setFilterResults } from '@/state/actions/filters';
import { getConformingProducts, getNonConformingProducts, getFHAProducts, getVeteranProducts } from '@/services/products';
import { Product } from '../reducers/products';

export const getProducts = (dispatch: Dispatch) => async (criteria: any) => {
	try {
		const conformingProducts = await getConformingProducts(criteria);
		const nonConformingProducts = await getNonConformingProducts(criteria);
		const fhaProducts = await getFHAProducts(criteria);
		let vaProducts = [];
		if (criteria.Veteran.isActive) {
			vaProducts = await getVeteranProducts(criteria) as any[];
		}
		console.log('&&&&&&&&', vaProducts)
		const products = _.concat(conformingProducts, nonConformingProducts, fhaProducts, vaProducts).filter(Boolean) as Product[];
		dispatch(setProducts(products))
		const interestMin = _.minBy(products, (product: Product) => product.rate).rate;
		const interestMax = _.maxBy(products, (product: Product) => product.rate).rate;
		const lenderFeeMin = _.minBy(products, (product: Product) => product.discount).discount;
		const lenderFeeMax = _.maxBy(products, (product: Product) => product.discount).discount;
		dispatch(setFilterResults({ name: 'interestRate', criteria: { top: interestMax, bottom: interestMin }}));
		dispatch(setFilterResults({ name: 'lenderFees', criteria: { top: lenderFeeMax, bottom: lenderFeeMin }}))
	} catch (e) {
		console.log('Error: ', e);
	}
	
}
