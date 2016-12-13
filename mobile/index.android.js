/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Application from './src/Application';


export default class Mobile extends Component {
  render() {
    return (
      <Application />
    );
  }
}

AppRegistry.registerComponent('mobile', () => Mobile);
