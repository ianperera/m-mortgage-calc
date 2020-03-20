import { Map, List } from 'immutable'
import { Product } from '@/state/reducers/products'
import { SearchCriteria } from '@/state/reducers/search'
import { LoanProducts, LoanPrograms, InterestRate, LenderFees } from './filters'

export interface StateTypes {
	products: Map<string, List<Product>>
	search: Map<string, SearchCriteria>
	filterResults: Map<string, LoanProducts | LoanPrograms | InterestRate | LenderFees>,
}
