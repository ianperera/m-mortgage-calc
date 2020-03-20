export default {
	...require('./products').default,
	...require('./search').default,
	...require('./filters').default
};
