import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export default (theme: Theme) =>
	createStyles({
		root: {
			position: 'relative',
			maxWidth: 400,
			margin: '2rem auto',
		}
	});