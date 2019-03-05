1. Provider 里面加上 toast
		return (
      <Provider store={this._store}>
        {Component}
        <Toast/>
      </Provider>
    )