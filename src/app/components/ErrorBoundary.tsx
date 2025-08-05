import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ApplicationError, formatError, handleError } from '../../app/services/errorService';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error: ApplicationError | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    const appError = handleError(error);
    return { hasError: true, error: appError };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    const appError = handleError(error);
    console.error('ErrorBoundary caught:', appError, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    // Для RN можно использовать AppRegistry.runApplication, но чаще просто перерисовать дерево.
    // Можно также добавить: if (globalThis?.location?.reload) globalThis.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Что-то пошло не так!</Text>
          <Text style={styles.details}>{formatError(this.state.error)}</Text>
          {this.state.error?.details && (
            <Text style={styles.details}>
              {JSON.stringify(this.state.error.details, null, 2)}
            </Text>
          )}
          <TouchableOpacity style={styles.button} onPress={this.handleReload}>
            <Text style={styles.buttonText}>Обновить</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  details: { color: '#d00', marginTop: 8, textAlign: 'center' },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#1877f2',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});