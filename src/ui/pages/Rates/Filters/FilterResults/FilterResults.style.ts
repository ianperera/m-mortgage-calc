import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export default (theme: Theme) => createStyles({
	wrapper: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2.5),
		marginBottom: theme.spacing(2)
	},
	title: {
		fontWeight: 'bold'
	},
	filterContainer: {
		padding: theme.spacing(1.5, 0)
	}
});

