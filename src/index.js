import './assets/style/index.less';
import test from './utils/test';

const a = {id: 1}
const b = {...a, test: 1}
console.log('index.js')
console.log(a, b)

if (module.hot) {
  module.hot.accept()
}