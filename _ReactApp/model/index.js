import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

import invariant from 'invariant';
import injectModel from './injectModel.js';
import getMethods from './methods.js';

export default function(app) {

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(a => a, applyMiddleware(sagaMiddleware));
  const methods = getMethods(store, sagaMiddleware, app._config);

  app._store = store;
  app._config.sagaMethod = { ...methods }; // saga中注入

  return {
    ...methods,
    create: injectModel(sagaMiddleware, store, app._config)
  };
};
