import { Theme, createMuiTheme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export default (theme: Theme) => createStyles({
	container: {
		margin: theme.spacing(1, 0)
	},
	divider: {
		backgroundColor: theme.palette.primary.main,
		marginBottom: theme.spacing(2)
	},
	startAdornment: {
		'& p': {
			color: theme.palette.grey[800]
		}
	},
	radiobox: {
		color: theme.palette.grey[400]
	},
	tabWrapper: {
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: theme.palette.primary.main
	},
	indicator: {
		height: 5
	},
	tabLabel: {
		color: theme.palette.grey[400],
	},
	tabWrapper__result: {
		// backgroundColor: theme.palette.background.paper,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: theme.palette.background.paper
	},
	noTopMargin: {
		marginTop: 0,
	},
	btnTextPrimary: {
		color: '#fff',
		textTransform: 'capitalize',
		width: '6.5rem'
	},
	cancelBtn: {
		backgroundColor: theme.palette.secondary.main,
		borderColor: '#f0f0f0'
	},
	formWrapper: {
		position: 'relative',
		padding: theme.spacing(2.5),
		zIndex: 2
	},
	button: {
		borderRadius: 'unset',
		borderColor: theme.palette.grey[400]
	},
	advancedBox: {
		position: 'absolute',
		width: 350,
		top: '25%',
		left: 0,
		backgroundColor: theme.palette.grey[300],
		padding: theme.spacing(4),
		transition: theme.transitions.create(['left']),
	},
	opened: {
		left: '100%'
	},
	spacingTop: {
		marginTop: theme.spacing(7)
	},
});

export const resultPageTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#f0f0f0'
		},
		secondary: {
      main: '#4BB5c1'
    },
		text: {
			primary: '#f5f5f5'
		},
		action: {
			hoverOpacity: 0.6
		},
		background: {
			paper: '#86af48'
		}
	}
})