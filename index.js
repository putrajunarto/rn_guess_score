/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/index';
import {RequestProvider} from './src/context/RequestContext.js';

const Wrapper = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RequestProvider>
            <App />
          </RequestProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

AppRegistry.registerComponent(appName, () => Wrapper);
