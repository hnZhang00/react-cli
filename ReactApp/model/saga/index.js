import { takeEvery } from 'redux-saga/effects';
import invariant from 'invariant';
import sagaParams from './sagaParams';

export const wrapSaga = (namespace, store, config, sageEffect) => {
  return function* wrap(action) {
    try {
      yield sageEffect({
        ...config.sagaMethod,
        ...config.effects, // 注入自定义参数
        ...sagaParams(namespace, store)
      }, action)
    } catch (err) {
      console.log(`\n\n model"${namespace}"的run方法出错\n\n `) //出错的Generator为: \n\n ${sageEffect.toString()}
      console.log(err)
    }
  }
};

export const runSaga = (sagaMiddleware, namespace, config, store) => (key, sageEffect) => {

  invariant(typeof(key) === 'string', `the first arg of saga should be string`);
  invariant(typeof(sageEffect) === 'function', `the second arg of saga should be function`);

  sagaMiddleware.run(function*() {
    yield takeEvery(`${namespace}/${key}`, wrapSaga(namespace, store, config, sageEffect));
  });
};
