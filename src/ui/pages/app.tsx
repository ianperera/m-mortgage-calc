import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import withRoot from '@/withRoot';
import Home from '@/ui/pages/Home';
import Rates from '@/ui/pages/Rates';
import Header from '@/ui/components/header';

export class App extends React.Component<{}> {
	public render(): JSX.Element {
		return (
			<div>
				<Header />
				<BrowserRouter>
					<React.Fragment>
						<Route path="/" exact component={Home} />
						<Route path="/rates" component={Rates} />
					</React.Fragment>
				</BrowserRouter>
			</div>
			
		)
	}
}

export default withRoot(App);

