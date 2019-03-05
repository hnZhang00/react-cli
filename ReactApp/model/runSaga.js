import { takeEvery } from 'redux-saga/effects';
import invariant from 'invariant';
import sagaWrap from './sagaWrap';

export default (sagaMiddleware, namespace, config, store) => (key, sageEffect) => {

  invariant(typeof(key) === 'string', `the first arg of saga should be string`);
  invariant(typeof(sageEffect) === 'function', `the second arg of saga should be function`);

  sagaMiddleware.run(function*() {
    yield takeEvery(`${namespace}/${key}`, sagaWrap(namespace, store, config, sageEffect));
  });
}
