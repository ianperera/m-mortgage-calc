import { connect } from 'react-redux';


export const createAction = (type, payload) => ({ type, payload });

// This is priviate non-export that reconnect() uses
const mapSelectors = (selectors, state, ownProps) =>
	[
		...Object.keys(selectors).map(selector => ({
			[selector]: selectors[selector](state, ownProps)
		}))
	].reduce((a, b) => Object.assign(a, b), {});

export const reconnect = ({ selectors = null, actions = {}, routines = {} }) => connect(
		!selectors
			? null
			: state => {
				if (typeof selectors === 'function') {
					const s = selectors();
					return (state, ownProps) => mapSelectors(s, state, ownProps)
				}

				return mapSelectors(selectors, state);
			},
		dispatch => [
				...Object.keys(actions).map(action => ({
					[action]: (...args) => dispatch(actions[action].apply(this, args))
				})),
				...Object.keys(routines).map(routine => ({ [routine]: routines[routine](dispatch) }))
			].reduce((a, b) => Object.assign(a, b), {}),
		null,
		{}
	);
