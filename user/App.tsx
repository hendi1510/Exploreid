/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';
import { COLORS } from './src/theme/constants';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
