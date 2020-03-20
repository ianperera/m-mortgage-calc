import { Theme } from '@material-ui/core'
import createStyles from '@material-ui/core/styles/createStyles';

export default (theme: Theme) => createStyles({
	root: {
		paddingBottom: theme.spacing(2),
		[theme.breakpoints.down('md')] : {
			justifyContent: 'center',
			height: 90
		}
	},
	content: {
		listStyleType: 'none',
		paddingLeft: 0,
		display: 'flex',
		alignItems: 'stretch'
	},
	item: {
		display: 'flex',
		alignItems: 'center',
		borderRight: '1px solid #fafafa',
		padding: theme.spacing(0, 3),
		'&:last-child': {
			borderRight: 'none'
		}
	},
	hasLabel: {
		flexDirection: "column"
	},
	btnTextPrimary: {
		color: '#fff',
		textTransform: 'capitalize',
		width: 'auto'
	},
	leftBtn: {
		textAlign: 'right'
	}
})
