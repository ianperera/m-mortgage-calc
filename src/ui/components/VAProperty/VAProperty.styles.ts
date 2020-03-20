import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export default (theme: Theme) =>
  createStyles({
    container: {
			margin: theme.spacing(1, 0)
    },
    militaryExp: {
			padding: theme.spacing(0, 2),
			marginBottom: theme.spacing(2)
    },
    divider: {
			backgroundColor: theme.palette.primary.main,
			marginBottom: theme.spacing(2)
    },
		checkbox: {
			padding: theme.spacing(0.5),
			color: theme.palette.grey[400]
		},
		checkFormLabel: {
			marginLeft: theme.spacing(-1)
		},
		radiobox: {
			color: theme.palette.grey[400]
		}
  });
