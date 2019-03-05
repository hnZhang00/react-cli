import initModel from './model/index.js';
import start, { onStart, config } from './start.js';

const app = {
  _models: [],
  _store: null,
  _onStart: [],
  _config: { effects: {} }, //初始值，后面会用到
  config,
  onStart,
  start
};

export const Model = initModel(app);

export default app;
