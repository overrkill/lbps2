import React, { Component } from "react";

import { createStackNavigator } from "react-navigation-stack";
import MapScreen from "./Screen/MapScreen"
import Login from "./Screen/Login"
import Signup from "./Screen/Signup"
import Forgetpw from "./Screen/Forgetpw"

export default class App extends Component {
  render()
  {
    return(
      <AppStackNavigator/>
    );
  }
}
const AppStackNavigator = createStackNavigator({
  Login:Login,
  Signup:Signup,
  Forgetpw:Forgetpw,
  Map: {
    screen: MapScreen,
  },
  
});

