
import { createAction } from '@/state/utils';
import * as reducers from '../reducers/search'

export const setSearchCriteria = (payload: any) => createAction('set-search-criteria', payload);

export default {
	'set-search-criteria': reducers.setSearchCriteria
}