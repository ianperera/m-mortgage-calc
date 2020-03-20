import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import PricingInfo from '@/ui/components/PricingInfo';

import styles from './Home.style';

type IProps = WithStyles<typeof styles>;

const Home: React.SFC<IProps> = (props) => (
  <div className={props.classes.root}>
    <PricingInfo />
  </div>
)

export default withStyles(styles)(Home);
