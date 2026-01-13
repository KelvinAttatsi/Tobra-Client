import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/contexts/ToastContext';
import { router } from 'expo-router';

const ForgotPassword = () => {
  const { colors } = useTheme();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      showToast('Please enter your email', 'warning');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      showToast('Password reset link sent to your email', 'success');
      router.push('/auth/login'); // back to login after success
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.inner}>
        {/* Logo Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>T</Text>
          </View>
          <Text style={[styles.brandText, { color: colors.text }]}>Tobra</Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]}>Forgot Password</Text>
        <Text style={[styles.subText, { color: colors.textSecondary }]}>
          Enter your registered email and we’ll send you a reset link.
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity
          onPress={handleReset}
          style={[styles.button, { backgroundColor: colors.primary }]}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Reset Password</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={[styles.link, { color: colors.primary }]}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoCircle: {
    backgroundColor: '#222',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  brandText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default ForgotPassword;
