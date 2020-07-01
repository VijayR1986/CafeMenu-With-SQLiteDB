import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{gestureEnabled: false}}>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{title: 'Welcome to Jalsa Cafe!'}}
          />
          <Stack.Screen
            name="ProductScreen"
            component={ProductScreen}
            options={{title: 'Menu'}}
          />
          {/* <Stack.Screen
            name="ProductDetailsScreen"
            component={ProductDetailsScreen}
            options={{title: ' Product Details'}}
          />
          <Stack.Screen
            name="Add"
            component={ProductAddScreen}
            options={{title: 'Add Product'}}
          />
          <Stack.Screen
            name="Delete"
            component={ProductDeleteScreen}
            options={{title: 'DeleteProduct'}}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
