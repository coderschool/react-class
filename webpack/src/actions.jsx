import { LOCAL, AJAX, CHANGE_NODE } from './reducers';

const changeNode = (node, url) => ({
  type: CHANGE_NODE,
  url,
  node
});

const ajaxAction = (name, method, url, body) => {
  const payload = fetch(url, {
    credentials: 'same-origin',
    method,
    body,
  }).then(function(response){
    if (response.status != 200) {
      const e = new Error(response.status)
      e.status = response.status;
      throw e
    }
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


const loginOrRegister = (dispatch, f) => {
  return f()
    .then((data) => {
      document.cookie = `session=${data.value.session}`
      return data.value;
    })
    .then((data) => {
      if (data.role == 'admin' || data.role == 'manager') {
        dispatch(changeNode('userList'));
      } else {
        dispatch(changeNode('expenseList'));
      }    
    });
}

export const mapDispatchToProps = dispatch => ({
  // tweets
  fetchAllTweets: (userId) => {

  },
  tweet: (text) => {
    console.log('tweet');
    console.log('text');
    // return dispatch(ajaxAction('tweet'))
    //   .then(() => dispatch(ajaxAction('tweets', 'GET', `/tweet`)))
  },
  // local
  localAction: (name, key) => (value) => { dispatch(localAction(name, key, value))}
});
