import { List } from 'immutable';
import { createAction } from '@/state/utils';
import * as reducers from '../reducers/products'

export const setProducts = (products: reducers.Product[])  =>
	createAction('set-products', List(products));

export default {
	'set-products': reducers.setProducts
}