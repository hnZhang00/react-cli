import sagaParams from './sagaParams';

export default (namespace, store, config, sageEffect) => {
  return function* sagaWrap(action) {
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
}
