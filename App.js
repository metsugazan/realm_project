import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';

import StackNavigation from './src/navigation/StackNavigation';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: "white",
      primary: "#FFF",
    },
  roundness: 10,
};


export default class App extends React.Component {
  render() {
    return (
            <PaperProvider theme={theme}>
                <StatusBar backgroundColor="#2B6747" barStyle="auto" />
            <StackNavigation />      
        </PaperProvider>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

