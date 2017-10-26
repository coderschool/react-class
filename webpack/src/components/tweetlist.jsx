import React, { PropTypes } from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import TweetItem from './tweetitem';

export default class TweetListComponent extends React.Component {

  componentDidMount() {
    this.props.fetchAllTweets();
  }

  render () {

    const tweets = this.props.remote.getIn(['tweets', 'items']) || [];

    const items = tweets.map((tweet) => {
      const tweetJs = tweet.toJS()
      return (
        <TweetItem id={tweetJs.id} key={tweetJs.id} text={tweetJs.text} likes={tweetJs.likes} />
      );
    })

    return (
      <div>{items}</div>
    );
  }
}
