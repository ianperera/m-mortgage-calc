import { createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export default (theme: Theme) => createStyles({
	root: {
		'&:before': {
			backgroundColor: 'rgba(0, 0, 0, 0.12)'
		}
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
	},
	table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
	},
	btnTextPrimary: {
		color: '#fff'
	},
	button: {
		borderRadius: 'unset',
		borderColor: theme.palette.primary.dark
	},
	propertyDetail: {
		overflowX: "auto"
	}
})