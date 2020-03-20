import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export default (theme: Theme) => createStyles({
	resultHeader: {
		backgroundColor: theme.palette.primary.main
	},
	productWrapper: {
		position: "relative"
	},
	loadingWrapper: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
});
