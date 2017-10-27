import React, { PropTypes } from 'react';
import _ from 'lodash';
import Immutable from 'immutable';
import {Jumbotron, Button} from 'react-bootstrap';

export default class TweetItemComponent extends React.Component {

  render () {
    return (
      <Jumbotron>
        <span>Id: {this.props.id}</span>
        <p>{this.props.text}</p>
        <p>
          <span>Likes: {this.props.likes}</span>
          <Button onClick={this.props.likeTweet}>Like</Button>
        </p>
      </Jumbotron>
    );
  }
}
