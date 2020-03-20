import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react'
import { Store } from 'redux';
import { store } from '@/state/store';
import App from '@/ui/pages/app';

export const getNewWrappedApp = (store: Store) => (
	<Provider store={store}>
		<App />
	</Provider>
);

export const wrappedApp = getNewWrappedApp(store);

ReactDOM.render(wrappedApp, document.querySelector('#root'));
