import React, { PropTypes } from 'react';
import { FormControl, Button, ControlLabel, FormGroup } from 'react-bootstrap';

export default class TweetBoxComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

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

  handleChange(text) {
    this.setState({
      text
    });
  }

  render () {
    const text = this.state.text || '';
    const postTweet = () => {
      this.props.onTweet(text);
      this.setState({
        text: ''
      });
    }
    const tweetDisabled = text.length === 0 || this.remainingCharacters(text) < 0

    const handleChange = (e) => {
      this.setState({
        text: e.target.value
      });
    }

    return (
      <div className="App-intro">
        { this.overflowAlert(text) }
        <FormGroup>
          <ControlLabel>Tweet here</ControlLabel>
          <FormControl componentClass="textarea"
                       value={text}
                       onChange={handleChange}
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
