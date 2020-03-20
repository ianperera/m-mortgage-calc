import * as React from 'react';
import classNames from 'classnames';
import { Theme } from '@material-ui/core';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { createStyles } from '@material-ui/core/styles'

interface OwnProps {
	children: React.ReactNode;
	fluid?: boolean;
	className?: string;
}

type IProps = OwnProps & WithStyles<typeof styles>;

const styles = (theme: Theme) => createStyles({
	section: {
		width: '100%',
		padding: theme.spacing(2, 0),
		margin: '0 auto',
		[theme.breakpoints.down('md')]: {
			paddingRight: '2rem',
			paddingLeft: '2rem',
		},
		[theme.breakpoints.up('md')]: {
			width: 940
		},
		[theme.breakpoints.up('lg')]: {
			width: 1170
		},
		[theme.breakpoints.up('xl')]: {
			width: 1440
		}
	},
	fluid: {
		width: '100%'
	}
})

const SectionWrapper: React.SFC<IProps> = (props) => (
	<section className={classNames([props.classes.fluid, props.className])}>
		<div className={classNames([props.classes.section, props.fluid && props.classes.fluid])}>
			{props.children}
		</div>
	</section>
);

SectionWrapper.defaultProps = {
	fluid: false,
	className: ''
}

export default withStyles(styles)(SectionWrapper);
