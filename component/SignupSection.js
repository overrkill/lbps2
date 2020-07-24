import React, {Component} from 'react';

import {Dimensions, StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native'


export default class SignupSection extends Component {
  constructor() {
    super();
    this._onPress = this._gotosignup.bind(this);
    this._onPress = this._forget.bind(this);
  }
  _gotosignup()
  {
    ;
  }
  _forget()
  {
    this.props.navigation.navigate('Forgetpw');
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress = {this.props.navigation.navigate('Signup')}><Text style={styles.text}>Create Account</Text></TouchableOpacity>
        <TouchableOpacity onPress = {this.props.navigation.navigate('Forgetpw')}><Text style={styles.text}>Forgot Password?</Text></TouchableOpacity>
      </View>
    );
    
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 65,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});
