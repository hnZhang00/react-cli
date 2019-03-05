
if (module.hot) {
  module.hot.accept()
}

import ReactApp from 'ReactApp';
import routes from './router';
// import 'assets/style/index.less';

ReactApp.start(routes, '#root');
