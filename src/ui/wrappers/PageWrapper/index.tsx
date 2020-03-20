import * as React from 'react';
import { Theme } from '@material-ui/core'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) => ({
	page: {
		width: '100%'
	}
})

interface InnerProps {
	children: React.ReactNode
}

type IProps = InnerProps & WithStyles<typeof styles>

class PageWrapper extends React.PureComponent<IProps> {
	render() {
		return (
			<main>
				<div className={this.props.classes.page}>
					{this.props.children}
				</div>
			</main>
		)
	}
}

export default withStyles(styles)(PageWrapper);
