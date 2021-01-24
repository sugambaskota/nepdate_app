import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {Provider} from 'react-redux';
import store from './store';

import {loadUser} from './src/actions/auth';
import Routes from './src/routing/Routes';

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    background: '#fff',
  },
};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyLightTheme}>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
