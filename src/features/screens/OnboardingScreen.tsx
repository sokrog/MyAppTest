import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { finishOnboarding } from '../../store/slices/authSlice';

const OnboardingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('onboarding.title')}</Text>
      <Button title={t('onboarding.finish')} onPress={() => dispatch(finishOnboarding())} />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginBottom: 24, fontSize: 24 }
});