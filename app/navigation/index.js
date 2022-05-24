import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    LoginScreen, 
    OtpScreen, 
    LogoScreen, 
    WelcomeScreen, 
    SignupScreen,
    HomeScreen
} from '../screens';


const Stack = createStackNavigator();

const Navigators = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Logo" component={LogoScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="SignUp" component={SignupScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Otp" component={OtpScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigators;