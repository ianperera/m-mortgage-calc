import { withStyles, createStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase'

export default withStyles(theme => createStyles({
	root: {
		border: '1px solid',
		borderColor: theme.palette.primary.main,
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		'label + &': {
			marginTop: theme.spacing(3),
		},
		'&:focus': {
			border: '2px solid #86af48',
		}
	},
	input: {
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		fontSize: 12,
		width: 'auto',
		padding: '10px 26px 10px 12px',
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
	error: {
		border: '1px solid',
		borderColor: theme.palette.error.main,
	}
}))(InputBase);
