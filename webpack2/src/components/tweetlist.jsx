import React, { PropTypes } from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import TweetItem from './tweetitem';
import {Grid, Row} from 'react-bootstrap';

export default class TweetListComponent extends React.Component {
  render () {
    const tweets = this.props.tweets;

    const items = tweets.map((tweet) => {
      return (
        <Row key={tweet.text}>
          <TweetItem text={tweet.text} 
                     likes={0} />
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
