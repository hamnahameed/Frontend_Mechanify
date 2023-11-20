import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Main/HomeScreen';
import LoginScreen from '../screens/Main/LoginScreen';
import SignupScreen from '../screens/Main/SignupScreen';
import LoadingScreen from '../screens/Main/LoadingScreen';
import LogoutModal from '../screens/Main/LogoutModal';
import EmailVerificationScreen from '../screens/Main/EmailVerificationScreen';


const Stack = createStackNavigator();

const AuthStack=()=>{
  return(
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name='Loading' component={LoadingScreen} options={{ headerShown: false }} />
    <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} />
    <Stack.Screen name='EmailVerification' component={EmailVerificationScreen} options={{ headerShown: false }} />


  </Stack.Navigator>
  )
}

export default AuthStack