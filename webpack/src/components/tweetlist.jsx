import React, { PropTypes } from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import TweetItem from './tweetitem';
import {Grid, Row} from 'react-bootstrap';

export default class TweetListComponent extends React.Component {

  componentDidMount() {
    console.log('test');
    this.props.fetchAllTweets();
  }

  render () {
    const tweets = this.props.remote.getIn(['tweets', 'items']) || [];

    const items = tweets.map((tweet) => {
      const tweetJs = tweet.toJS()
      const likeTweet = () => {
        return this.props.likeTweet(tweetJs.id);
      }
      return (
        <Row key={tweetJs.id}>
          <TweetItem id={tweetJs.id}
                     text={tweetJs.text} 
                     likes={tweetJs.likes}
                     likeTweet={likeTweet} />
        </Row>
      );
    })

    return (
      <Grid>
        {items}
      </Grid>
    );
  }
}
