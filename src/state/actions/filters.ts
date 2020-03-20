import { createAction } from '@/state/utils'
import * as reducer from '../reducers/filters'

export const setFilterResults = (filterData: {name: string, criteria: any }) => 
  createAction('set-filter-results', filterData)

  export const setFilterSelections = (filterData: {name: string, criteria: any }) => 
  createAction('set-filter-selections', filterData)

export default {
  'set-filter-results': reducer.setFilterResults,
  'set-filter-selections': reducer.setFilterSelections
}