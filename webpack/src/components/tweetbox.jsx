import React, { PropTypes } from 'react';

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
      this.props.postTweet(text)
    }
    const tweetDisabled = text.length === 0 || this.remainingCharacters(text) < 0

    return (
      <div className="well clearfix">
        { this.overflowAlert(text) }
        <textarea className="form-control" 
                  onChange={this.props.localAction('tweetbox', 'text')}>
        </textarea>
        <br/>
        <span>{ this.remainingCharacters(text) }</span>
        <button className="btn btn-primary pull-right" 
                disabled={tweetDisabled} 
                onClick={postTweet}>
          Tweet
        </button>
      </div>
    );
  }
}
