import { Action } from 'redux';
import { StateTypes } from '@/state/models'
import { State } from './initial-state';

export interface IAction<T = any> extends Action {
	payload: T
}

const defaultState: StateTypes = new State();

const bindReducers = (allReducers: any): any => {
	return Object.keys(allReducers).reduce((a, key) => {
		const reducer = allReducers[key];
		// added action.type for switch type reducers

		return {
			...a,
			[key]: (state: any, action: IAction) => reducer.call(null, state, action.payload, action.type)
		};
	}, {});
}

const actions = bindReducers(require('./actions').default);

export const rootReducer = (state: StateTypes = defaultState, action: Action) => {
	if (actions[action.type]) {
		return actions[action.type](state, action)
	}

	return state;
}
