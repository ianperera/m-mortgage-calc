import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export default (theme: Theme) =>
  createStyles({
    iconButton: {
			borderRadius: 'unset',
			border: `1px solid ${theme.palette.primary.main}`,
			backgroundColor: theme.palette.background.paper,
			boxShadow: 'none',
			padding: theme.spacing(1),
			width: 41,
			height: 41
		},
    stateSelect: {
			marginLeft: theme.spacing(-2)
		},
		countySelect: {
			width: '110%'
		},
		divider: {
			backgroundColor: theme.palette.primary.main,
			marginBottom: theme.spacing(2)
		}
	});
	