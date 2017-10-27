import React, { PropTypes } from 'react';
import { FormControl, Button, ControlLabel, FormGroup } from 'react-bootstrap';

export default class TweetBoxComponent extends React.Component {
  remainingCharacters (text) {
    return 140 - text.length;
  }

  overflowAlert (text) {
    if (this.remainingCharacters(text) < 0) {
      var beforeOverflowText = text.substring(140 - 10, 140);
      var overflowText = text.substring(140);

      return (
        <div className="alert alert-warning">
          <strong>Oops! Too Long:</strong>
          &nbsp;...{beforeOverflowText}
          <strong className="bg-danger">{overflowText}</strong>
        </div>
      );
    } else {
      return "";
    }
  }

  render () {
    const text = this.props.local.getIn(['tweetbox', 'text']) || '';
    const postTweet = () => {
      this.props.postTweet(text);
      this.props.localReset('tweetbox', 'text');
    }
    const tweetDisabled = text.length === 0 || this.remainingCharacters(text) < 0

    return (
      <div className="App-intro">
        { this.overflowAlert(text) }
        <FormGroup>
          <ControlLabel>Tweet here</ControlLabel>
          <FormControl componentClass="textarea"
                       value={text}
                       onChange={this.props.localAction('tweetbox', 'text')}
                       placeholder="test">
          </FormControl>
        </FormGroup>
        <p>{ this.remainingCharacters(text) }</p>
        <Button onClick={postTweet}
                disabled={tweetDisabled}>
          Tweet
        </Button>
      </div>
    );
  }
}
