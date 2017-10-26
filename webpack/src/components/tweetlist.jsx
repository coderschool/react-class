import React, { PropTypes } from 'react';
import _ from 'lodash';
import Immutable from 'immutable';

export default class TweetListComponent extends React.Component {

  componentDidMount() {
    const userId = this.props.node.url || 'me';
    this.props.fetchExpenses(userId);
  }

  constructor (props) {
    super(props);
    this.state = {
    };
  }

  return (
    <div></div>
  );
}
