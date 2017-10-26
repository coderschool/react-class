import 'babel-polyfill';
import 'whatwg-fetch';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TweetBox from './components/tweetbox';
import TweetList from './components/tweetlist';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';

import { localReducer, ajaxReducer, nodeReducer } from './reducers';
import { mapDispatchToProps } from './actions';


const App = props => {
  const fsm = {
    list: TweetList,
  };

  const {node} = props;

  const Node = fsm[node.node];

  if (!Node) {
    console.log(`ERROR node not found: ${node.node}`);
  }

  return (
    <div>
      <TweetBox {...props}/>
      <Node {...props}/>
    </div>
  );
}

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', JSON.parse(JSON.stringify(store.getState(), null, 2)));
  console.groupEnd(action.type);
  return result;
};

const store = createStore(
  combineReducers({
    node: nodeReducer,
    local: localReducer,
    remote: ajaxReducer,
  }),
  applyMiddleware(
    promiseMiddleware(),
    logger
  )
);

const mapStateToProps = state => state;

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app')
);
