import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { signOutAsync } from '../../store/thunks/authThunks';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Главная страница</Text>
      <Button title="Выйти" onPress={() => dispatch<any>(signOutAsync())} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24 }
});