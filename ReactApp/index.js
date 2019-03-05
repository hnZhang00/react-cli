import invariant from 'invariant';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { isString, isHTMLElement } from './utils';
import initModel from './model';

const app = {
  _model: null,
  _store: null,
  _config: { effects: {} }, //初始值，后面会用到
  start
};

export const Model = initModel(app);

export default app;

function start(router, container) {
  // 允许 container 是字符串，然后用 querySelector 找元素
  if (isString(container)) {
    container = document.querySelector(container);
    invariant(
      container,
      `[app.start] container ${container} not found`,
    );
  }

  // 并且是 HTMLElement
  invariant(
    !container || isHTMLElement(container),
    `[app.start] container should be HTMLElement`,
  );

  // if (!app._store) {
  //   oldAppStart.call(app);
  // }
  const store = app._store;

  // If has container, render; else, return react component
  let _APP = getProvider(app, store, router);
  if (container) {
    render(_APP, container);
  } else {
    return _APP;
  }
};

function getProvider(app, store, router) {
  return (
    <Provider store={store}>
      { router({ app, history: app._history || {} }) }
    </Provider>
  );
}
