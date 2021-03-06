import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// component imports


//material UI imports
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';


// bar styling
const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

class SingleShows extends Component {
  state = {
    open: false,
    show: null,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
      .then((response) => response.json())
      .then((json) => this.setState({ show: json, open: true }));
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        {show !== null && (
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <AppBar style={styles.appBar}>
              <Toolbar>
                <Link to={'/'}>
                  <IconButton
                    color='default'
                    onClick={this.handleClose}
                    aria-label='Close'
                  >
                    <CloseIcon />
                  </IconButton>
                </Link>
                <Typography variant='title' color='inherit' style={styles.flex}>
                  {show.name}
                </Typography>
              </Toolbar>
            </AppBar>

            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* show's cover photo */}
              <div>
                <ListItem button>
                  {show.image != null && (
                    <img alt='Show' src={show.image.medium} />
                  )}
                </ListItem>
              </div>

              {/* list to the right of show's cover photo */}
              <div>
                <List>
                <Divider />
                  <ListItem button>
                    <ListItemText
                      primary='Premiere Date:'
                      secondary={show.premiered}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      primary='Average Rating:'
                      secondary={show.rating.average}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      primary='Total Episodes:'
                      secondary={show._embedded.episodes.length}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      primary='Add to Favorites?'
                    />
                  </ListItem>
                  <Divider />
                </List>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    );
  }
}

export default SingleShows;


