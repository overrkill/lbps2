import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
  TextInput,
} from 'react-native';

import * as firebase from "firebase";

import spinner from '../images/loading.gif';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      showPass: true,
      press: false,
      email: "",
      passwd: "",
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }
  _onPress(email,passwd) {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
    this.login(this.state.email,this.state.passwd)
    this.setState({isLoading: false});
    this.buttonAnimated.setValue(0);
    this.growAnimated.setValue(0);
      
    }, 2300);
  }

  async login(email,passwd){
    try {
      await firebase.auth()
      .signInWithEmailAndPassword(email, passwd);

      console.log("Logged In!");
      console.log(email);
      console.log(passwd)
      this.props.navigation.navigate('MapScreen');

  } catch (error) {
      console.log(error.toString())
      Alert.alert(error.toString());

  }

  }
  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View View style={styles.inputWrapper}>
      <View style={styles.inputWrapper}>
        <Image source={usernameImg} style={styles.inlineImg} />
        <TextInput
          style={styles.input}
          placeholder="UserName"
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={false}
          autoCapitalize={'none'}
          returnKeyType={'done'}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Image source={passwordImg} style={styles.inlineImg} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={this.state.showPass}
          autoCorrect={false}
          autoCapitalize={'none'}
          returnKeyType={'done'}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          onChangeText={(passwd) => this.setState({passwd})}
          value={this.state.passwd}
        />
      </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._onPress(this.state.email, this.state.passwd)}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
   
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1DA7F8',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#1DA7F8',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#1DA7F8',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  btnEye: {
    position: 'absolute',
    top: 73,
    right: 38,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});
