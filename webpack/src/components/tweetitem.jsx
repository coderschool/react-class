import React, { PropTypes } from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import {Jumbotron, Button} from 'react-bootstrap';

export default class TweetItemComponent extends React.Component {

  render () {
    return (
      <Jumbotron>
        <p>{this.props.text}</p>
        <p>
          <Button onClick={this.props.likeTweet}>Likes: {this.props.likes}</Button>
        </p>
      </Jumbotron>
    );
  }
}
