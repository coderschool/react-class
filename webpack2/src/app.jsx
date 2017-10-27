import 'babel-polyfill';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TweetBox from './components/tweetbox';
import TweetList from './components/tweetlist';

import { Grid, Row } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    }
  }

  onTweet(tweet) {
    const tweetPayload = {
      text: tweet      
    }
    const newState = this.state.tweets.concat(tweetPayload);
    this.setState({
      tweets: newState
    });
  }

  render () {
    return (
      <div>
        <Grid>
          <Row key="tweetbox">
            <TweetBox onTweet={this.onTweet.bind(this)}/>
          </Row>
          <Row key="tweetlist">
            <TweetList tweets={this.state.tweets}/>
          </Row>
        </Grid>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
