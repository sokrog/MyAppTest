import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { finishOnboarding } from '../../store/slices/authSlice';

const OnboardingScreen: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Онбординг</Text>
      <Button title="Завершить онбординг" onPress={() => dispatch(finishOnboarding())} />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginBottom: 24, fontSize: 24 }
});