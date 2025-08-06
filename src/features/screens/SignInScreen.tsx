import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { signInAsync, restoreSessionAsync } from '../../store/thunks/authThunks';
import { RootState } from '../../store';

const SignInScreen: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch<any>(restoreSessionAsync());
  }, [dispatch]);

  const handleSignIn = async () => {
    setLoading(true);
    await dispatch<any>(signInAsync(email, password));
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('signIn.title')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('signIn.email')}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder={t('signIn.password')}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title={loading ? t('signIn.loading') : t('signIn.signIn')}
        onPress={handleSignIn}
        disabled={loading}
      />
      <Text style={styles.hint}>
        {t('signIn.hint')} <Text style={{ fontWeight: 'bold' }}>test@test.com</Text> {t('signIn.and')} <Text style={{ fontWeight: 'bold' }}>1234</Text>
      </Text>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  title: { marginBottom: 24, fontSize: 24 },
  input: { width: '100%', borderWidth: 1, borderColor: '#aaa', borderRadius: 6, marginVertical: 8, padding: 10 },
  error: { color: 'red', marginBottom: 8 },
  hint: { marginTop: 24, color: '#888', textAlign: 'center' },
});