import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
//import App from './app.jsx';
import App from './appvol2.js';

render( <AppContainer><App/></AppContainer>, document.querySelector("#app"));

if (module && module.hot) {
  module.hot.accept('./appvol2.js', () => {
    const App = require('./appvol2.js').default;
    render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.querySelector("#app")
    );
  });
}
