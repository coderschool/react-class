import React, { PropTypes } from 'react';
import _ from 'lodash';
import Immutable from 'immutable';

export default class TweetItemComponent extends React.Component {

  componentDidMount() {
  }

  render () {
    return (
      <div>
        <span>Id: {this.props.id}</span>
        <span>{this.props.text}</span>
        <span>Likes: {this.props.likes}</span>
      </div>
    );
  }
}
