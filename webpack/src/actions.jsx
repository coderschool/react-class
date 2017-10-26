import { LOCAL, AJAX, CHANGE_NODE } from './reducers';

const changeNode = (node, url) => ({
  type: CHANGE_NODE,
  url,
  node
});

const ajaxAction = (name, method, url, body) => {
  const host = 'http://localhost:5000'
  const payload = fetch(host + url, {
    // credentials: 'same-origin',
    method,
    body,
  }).then(function(response){
    if (response.status != 200) {
      const e = new Error(response.status)
      e.status = response.status;
      throw e
    }
    return response.json();
  });

  // Only meta is preserved
  return {
    type: AJAX,
    meta: {
      name,
    },
    payload,
  };
};

const localAction = (name, key, value) => {
  return {
    type: LOCAL,
    name,
    key,
    value: value.target.value,
  };
};

export const mapDispatchToProps = dispatch => ({
  // tweets
  fetchAllTweets: (userId) => {
    return dispatch(ajaxAction('tweets', 'GET', '/tweets'))
  },
  postTweet: (text) => {
    const formData = new FormData();    
    formData.append('text', text);
    return dispatch(ajaxAction('tweet', 'POST', '/tweets', formData))
      .then(() => dispatch(ajaxAction('tweets', 'GET', '/tweets')))
  },
  // local
  localAction: (name, key) => (value) => { dispatch(localAction(name, key, value))}
});
