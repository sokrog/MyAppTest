import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import './src/app/i18n/i18n';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from './src/store';
import SplashScreen from './src/features/screens/SplashScreen';
import SignInScreen from './src/features/screens/SignInScreen';
import OnboardingScreen from './src/features/screens/OnboardingScreen';
import HomeScreen from './src/features/screens/HomeScreen';

const Stack = createStackNavigator();

function RootStack() {
  const [showSplash, setShowSplash] = useState(true);
  const { isSignedIn, isOnboarded } = useSelector((state: RootState) => state.auth);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isSignedIn ? (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      ) : !isOnboarded ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}
