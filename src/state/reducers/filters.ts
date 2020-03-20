import { StateTypes } from "../models";

export const setFilterSelections = (state: any, filterData: {name: string, criteria: any }) =>
	state.mergeDeepIn(['filterResults', filterData.name], {...filterData.criteria})

export const setFilterResults = (state: any, filterData: {name: string, criteria: any }) => 
	state.mergeDeepIn(['filterResults', filterData.name], { ...filterData.criteria })