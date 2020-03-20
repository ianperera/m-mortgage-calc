import React, { PureComponent } from 'react';
import { AppBar, Toolbar, Button, IconButton, Icon, Theme, Container, Box } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
});

interface IProps extends WithStyles<typeof styles> {

}

class NavHeader extends PureComponent<IProps> {
  handleClickApply = () => {
    window.location.href = 'https://momentumloans.com/apply';
  }

  handleClickSignin = () => {
    window.location.href = 'https://momentumloans.com/SignIn';
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" color="default">
        <Container>
          <Toolbar classes={{ root: classes.root }}>
            <img src="/imgs/logo.svg" />
            <Box display="flex">
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className={classes.menuButton}
                onClick={this.handleClickApply}
              >
                Apply
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className={classes.menuButton}
                onClick={this.handleClickSignin}
              >
                SIGNIN
              </Button>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                <Icon color="primary">menu</Icon>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  }
}

export default withStyles(styles)(NavHeader)